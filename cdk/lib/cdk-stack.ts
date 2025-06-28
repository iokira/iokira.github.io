import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as iam from "aws-cdk-lib/aws-iam";
import path from "path";

interface StackProps extends cdk.StackProps {
    domainName: string;
    hostedZoneId: string;
}

export class SiteStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const bucket = new s3.Bucket(this, "SiteBucket", {
            bucketName: props.domainName.toLowerCase(),
            websiteIndexDocument: "index.html",
            publicReadAccess: false,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            removalPolicy: cdk.RemovalPolicy.RETAIN,
            autoDeleteObjects: false,
        });

        const oac = new cloudfront.CfnOriginAccessControl(this, "SiteOAC", {
            originAccessControlConfig: {
                name: "SiteOAC",
                originAccessControlOriginType: "s3",
                signingBehavior: "always",
                signingProtocol: "sigv4",
            },
        });

        const zone = route53.HostedZone.fromHostedZoneAttributes(
            this,
            "HostedZone",
            {
                hostedZoneId: props.hostedZoneId,
                zoneName: props.domainName,
            },
        );

        const distribution = new cloudfront.Distribution(
            this,
            "SiteDistribution",
            {
                defaultRootObject: "index.html",
                domainNames: [props.domainName],
                defaultBehavior: {
                    origin: new origins.S3StaticWebsiteOrigin(bucket),
                    viewerProtocolPolicy:
                        cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                    compress: true,
                },
            },
        );

        (
            distribution.node.defaultChild as cloudfront.CfnDistribution
        ).addPropertyOverride(
            "DistributionConfig.Origins.0.OriginAccessControlId",
            oac.attrId,
        );
        (
            distribution.node.defaultChild as cloudfront.CfnDistribution
        ).addPropertyOverride(
            "DistributionConfig.Origins.0.S3OriginConfig.OriginAccessIdentity",
            "",
        );

        new route53.ARecord(this, "SiteAliasRecord", {
            recordName: props.domainName,
            target: route53.RecordTarget.fromAlias(
                new targets.CloudFrontTarget(distribution),
            ),
            zone,
        });

        const githubActionsOidcProvider = new iam.OpenIdConnectProvider(
            this,
            "GitHubActionsOIDCProvider",
            {
                url: "https://token.actions.githubusercontent.com",
                clientIds: ["sts.amazonaws.com"],
                thumbprints: ["6938fd4d98bab03faadb97b34396831e3780cd4e"],
            },
        );

        const githubActionsRole = new iam.Role(
            this,
            "GitHubActionsOIDC-DeployRole",
            {
                assumedBy: new iam.FederatedPrincipal(
                    githubActionsOidcProvider.openIdConnectProviderArn,
                    {
                        StringLike: {
                            "token.actions.githubusercontent.com:sub":
                                "repo:iokira/iokira.github.io:*",
                        },
                        StringEquals: {
                            "token.actions.githubusercontent.com:aud":
                                "sts.amazonaws.com",
                        },
                    },
                    "sts:AssumeRoleWithWebIdentity",
                ),
                roleName: "GitHubActionsOIDC-DeployRole",
                description:
                    "IAM role for GitHub Actions to deploy site to S3 and CloudFront",
            },
        );

        githubActionsRole.addToPolicy(
            new iam.PolicyStatement({
                actions: [
                    "s3:PutObject",
                    "s3:GetObject",
                    "s3:ListBucket",
                    "s3:DeleteObject",
                ],
                resources: [bucket.bucketArn, bucket.bucketArn + "/*"],
            }),
        );

        new cdk.CfnOutput(this, "S3BucketName", {
            value: bucket.bucketName,
            description: "Name of the S3 bucket for the site.",
        });
        new cdk.CfnOutput(this, "CloudFrontDistributionId", {
            value: distribution.distributionId,
            description: "ID of the CloudFront distribution.",
        });
        new cdk.CfnOutput(this, "GitHubActionsIAMRoleName", {
            value: githubActionsRole.roleName,
            description: "Name of the IAM role for GitHub Actions.",
        });
        new cdk.CfnOutput(this, "SiteURL", {
            value: `https://${props.domainName}`,
            description: "The URL of the deployed site.",
        });

        new cdk.aws_s3_deployment.BucketDeployment(this, "DeploySite", {
            sources: [
                cdk.aws_s3_deployment.Source.asset(
                    path.join(__dirname, "../../dist"),
                ),
            ],
            distribution: distribution,
            distributionPaths: ["/*"],
            prune: true,
            destinationBucket: bucket,
        });
    }
}
