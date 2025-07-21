import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export class SiteStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const siteBucket = cdk.aws_s3.Bucket.fromBucketName(
            this,
            "SiteBucket",
            "iokira-net",
        );

        const distribution = new cdk.aws_cloudfront.Distribution(
            this,
            "SiteDistribution",
            {
                defaultRootObject: "index.html",
                defaultBehavior: {
                    origin: cdk.aws_cloudfront_origins.S3BucketOrigin.withOriginAccessControl(
                        siteBucket,
                    ),
                    viewerProtocolPolicy:
                        cdk.aws_cloudfront.ViewerProtocolPolicy
                            .REDIRECT_TO_HTTPS,
                },
            },
        );

        new cdk.aws_s3_deployment.BucketDeployment(this, "DeploySite", {
            sources: [],
            destinationBucket: siteBucket,
            distribution: distribution,
            distributionPaths: ["/*"],
        });

        new cdk.CfnOutput(this, "Hosting URL", {
            value: "https://" + distribution.distributionDomainName,
        });
    }
}
