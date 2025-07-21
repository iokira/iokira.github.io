import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import path from "path";

export class SiteStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const siteBucket = new cdk.aws_s3.Bucket(this, "SiteBucket", {
            bucketName: "iokira-net",
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
            blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ALL,
            enforceSSL: true,
        });

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
            sources: [
                cdk.aws_s3_deployment.Source.asset(
                    path.join(__dirname, "../../dist"),
                ),
            ],
            destinationBucket: siteBucket,
            distribution: distribution,
            distributionPaths: ["/*"],
        });
    }
}
