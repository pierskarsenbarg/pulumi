import * as aws from "@pulumi/aws";
import { PolicyPack, validateResourceOfType } from "@pulumi/policy";

new PolicyPack("aws-typescript", {
    policies: [{
        name: "s3 policies",
        description: "Policies for S3 buckets",
        enforcementLevel: "mandatory",
        validateResource: 
        [
            validateResourceOfType(aws.s3.Bucket, (bucket, args, reportViolation) => {
                if (bucket.acl === "public-read" || bucket.acl === "public-read-write") {
                    reportViolation(
                        "You cannot set public-read or public-read-write on an S3 bucket. " +
                        "Read more about ACLs here: https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html");
                }
            }),
            validateResourceOfType(aws.s3.Bucket, (bucket, args, reportViolation) => {
                if (bucket.versioning?.enabled === false) {
                    reportViolation("You should version your s3 bucket")
                        
                }
            })
        ],
    }],
});
