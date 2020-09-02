import * as aws from "@pulumi/aws";
import { PolicyPack, validateResourceOfType } from "@pulumi/policy";

new PolicyPack("aws-typescript", {
    policies: [{
        name: "s3 mandatory policies",
        description: "Mandatory policies for S3 buckets",
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
                    if (bucket.forceDestroy === true) {
                        reportViolation("You shouldn't have force destroy turned on for your S3 bucket. You should empty the bucket before deleting.");
                    }
                })
            ],
    },
    {
        name: "s3 advisory policies",
        description: "Advisory policies for S3 buckets",
        enforcementLevel: "advisory",
        validateResource: validateResourceOfType(aws.s3.Bucket, (bucket, args, reportViolation) => {
            if (bucket.versioning?.enabled === false) {
                reportViolation("You should version your s3 bucket")

            }
        })
    }]
});
