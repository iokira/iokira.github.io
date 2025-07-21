---
layout: ../../layouts/MarkdownPostLayout.astro
title: "静的 Web サイトを AWS でホストする"
publishDate: 2025/07/21
description: "AWS CDK を使って Route 53 + CloudFront + S3 構成の静的サイトを作成する。"
---

iokira です。最近は暑くてどうも外に出る気力が湧きませんね。

本サイトは GitHub Pages を使って公開していたのですが、せっかく AWS に慣れてきたということで移行を決意しました。

ドメインは Route 53 で取得済み、パブリックホストゾーンも作成していたため今回は CloudFront のディストリビューション作成、 S3 バケットの作成と OAC の設定を行います。一旦アクセスログや WAF の設定はせず、簡単な構成で立ち上げるところを目標に作業を行います。

また、Infrastructure as Code の精神に則り CDK で構築しています。

サンプルの完成形は[こちら](https://github.com/iokira/route53-cloudfront-s3-cdk.ts)をどうぞ。

## CDK プロジェクトの作成

今回は Typescript で記述します。

CDK のコードを管理する空のフォルダを作成し、プロジェクトの初期化を行います。

```shell
npx cdk init app --language typescript .
```

テストを書くほどのプロジェクトではないのと本筋からずれるため Jest 関連のファイルを消します。

```shell
rm -r test jest.config.js
```

`package.json` 内の記述も消しちゃいましょう。

```diff
diff --git a/package.json b/package.json
index 7a978a0..516e7f9 100644
--- a/package.json
+++ b/package.json
@@ -11,10 +11,7 @@
     "cdk": "cdk"
   },
   "devDependencies": {
-    "@types/jest": "^29.5.14",
     "@types/node": "22.7.9",
-    "jest": "^29.7.0",
-    "ts-jest": "^29.2.5",
     "aws-cdk": "2.1021.0",
     "ts-node": "^10.9.2",
     "typescript": "~5.6.3"
```

これで準備完了です。

## S3 バケットの定義

Web サイトのソースコードを格納するための S3 バケットを作成します。
"Your Bucket Name" 部分は世界中で一意な名前を入れましょうね。

削除ポリシーや SSL 、バージョニングの設定はここで行えます。ここでは特別な設定は書いていませんが、都度状況に応じてドキュメントを参照してください。

参考: [AWS CDK class Bucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.Bucket.html)

```ts
const bucket = new cdk.aws_s3.Bucket(this, "Bucket", {
    bucketName: "Your Bucket Name",
})
```

## CloudFront Distribution の作成

AWS の CDN こと CloudFront です。ここではコンテンツ配信に必要な Distribution を作成します。

特に難しい設定はないのですが、オリジンを S3 としてコンテンツ配信をするため `withOriginAccessControl` を忘れないようにしてください。

```ts
const distribution = new cdk.aws_cloudfront.Distribution(this, "Distribution", {
    defaultRootObject: "index.html",
    defaultBehavior: {
        origin: cdk.aws_cloudfront_origins.S3BucketOrigin.withOriginAccessControl(
            bucket,
        ),
    },
});
```

現代の Web フロントフレームワークを使っているとなにかと URL パスが「iokira.net/about」とか「iokira.net/blog」みたいにディレクトリ名でアクセスされることがありますよね。CloudFront + S3 構成で「index.html」を省略してアクセス（ディレクトリインデックスといいます）するためには、 CloudFront Functions か Lambda@Edge を使ってリクエストをちょちょいっと弄って上げる必要があります。それらの設定はここで Distribution の設定に含めてくださいね。

参考: [AWS CDK class Distribution](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cloudfront.Distribution.html)

## バケットの作成

S3 バケットをデプロイします。

ここでは `process.env` を使って、サイトのソースコードがあるパスを持ってくるようにしてあげています。ハードコードしちゃってもいいと思います。

```ts
new cdk.aws_s3_deployment.BucketDeployment(this, "DeployWebsite", {
    sources: [cdk.aws_s3_deployment.Source.asset(
        path.join(__dirname, process.env.SITE_SOURCE_PATH || "")
    )],
    destinationBucket: bucket,
    distribution: distribution,
    distributionPaths: ["/*"],
});
```

## ドメイン・証明書の関連付け

最後にドメインと証明書について関連付けを行います。

ここでも `process.env` を使っていますが、好きなように取ってきてください。

パブリックホストゾーンは事前に用意してある前提で話を進めているため `fromLookup` を使って取ってきています。取ってきたホストゾーンとドメイン名、 Distribution を使って Alias レコードを作成します。

```ts
const domainName = process.env.DOMAIN_NAME || "";

const certificate = cdk.aws_certificatemanager.Certificate.fromCertificateArn(
    this,
    "Certificate",
    process.env.AWS_ACM_CERTIFICATE_ARN || ""
)

const zone = cdk.aws_route53.HostedZone.fromLookup(this, "Zone", {
    domainName: domainName,
});

new cdk.aws_route53.ARecord(this, "AliasRecord", {
  zone: zone,
  recordName: domainName,
  target: cdk.aws_route53.RecordTarget.fromAlias(
    new cdk.aws_route53_targets.CloudFrontTarget(distribution)
  ),
});
```

Distribution 作成の際にドメイン名と証明書を渡す設定も追加してあげましょう。

```ts
const distribution = new cdk.aws_cloudfront.Distribution(this, "Distribution", {
    defaultRootObject: "index.html",
    defaultBehavior: {
        origin: cdk.aws_cloudfront_origins.S3BucketOrigin.withOriginAccessControl(
            bucket,
        ),
    },
    domainNames: [domainName], // 追加
    certificate: certificate, // 追加
});
```

## bin

最後に、Route53 をスタックで扱うためアカウント ID とリージョン情報をスタックに対して渡すようにしておきましょう。これがないと怒られます。

```ts
#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { SiteStack } from "../lib/site-stack";

const app = new cdk.App();
new SiteStack(app, "SiteStack", {
    env: {
        account: process.env.AWS_ACCOUNT_ID,
        region: "ap-northeast-1",
    },
});
```

## 完成

最低限のものができました。

他にも S3 バケットに対する Public Access の制限や、エラー時のリダイレクト設定なども各自行っておくと良いでしょう。

```ts
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import path from "path";

export class Route53CloudfrontS3CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const domainName = process.env.DOMAIN_NAME || "";

    const certificate = cdk.aws_certificatemanager.Certificate.fromCertificateArn(
        this,
        "Certificate",
        process.env.AWS_ACM_CERTIFICATE_ARN || ""
    )

    const bucket = new cdk.aws_s3.Bucket(this, "Bucket", {
        bucketName: "Your Bucket Name",
    })

    const distribution = new cdk.aws_cloudfront.Distribution(this, "Distribution", {
        defaultRootObject: "index.html",
        defaultBehavior: {
            origin: cdk.aws_cloudfront_origins.S3BucketOrigin.withOriginAccessControl(
                bucket,
            ),
        },
        domainNames: [domainName],
        certificate: certificate,
    });

    const zone = cdk.aws_route53.HostedZone.fromLookup(this, "Zone", {
        domainName: domainName,
    });

    new cdk.aws_s3_deployment.BucketDeployment(this, "DeployWebsite", {
        sources: [cdk.aws_s3_deployment.Source.asset(
            path.join(__dirname, process.env.SITE_SOURCE_PATH || "")
        )],
        destinationBucket: bucket,
        distribution: distribution,
        distributionPaths: ["/*"],
    });

    new cdk.aws_route53.ARecord(this, "AliasRecord", {
      zone: zone,
      recordName: domainName,
      target: cdk.aws_route53.RecordTarget.fromAlias(
        new cdk.aws_route53_targets.CloudFrontTarget(distribution)
      ),
    });
  }
}
```

これでいつでも AWS 上で静的サイトのデプロイができますね！

本項では自分用に簡単な説明と最低限のコードしか載せていないため、詳しく知りたい・書きたい場合は本文中に貼っています AWS CDK 公式ドキュメントや各種ブログを参照してください。

また、新規アカウントでデプロイする場合は `cdk bootstrap` をお忘れなく。では。
