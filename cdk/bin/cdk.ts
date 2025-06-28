#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { SiteStack } from "../lib/cdk-stack";

const app = new cdk.App();

const DOMAIN_NAME = process.env.DOMAIN_NAME || "";
const HOSTED_ZONE_ID = process.env.HOSTED_ZONE_ID || "";
const REGION = process.env.AWS_REGION || "ap-northeast-1";

new SiteStack(app, "SiteStack", {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: REGION,
    },
    domainName: DOMAIN_NAME,
    hostedZoneId: HOSTED_ZONE_ID,
});

app.synth();
