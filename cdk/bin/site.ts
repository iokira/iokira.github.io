#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CdkStack } from "../lib/site-stack";

const app = new cdk.App();
new CdkStack(app, "SiteStack", {});
