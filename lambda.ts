import * as aws from "@pulumi/aws";
import { BucketEvent } from "@pulumi/aws/s3";

export const onObjectCreatedLambda = (e: BucketEvent) => {
    const db = new aws.sdk.DynamoDB.DocumentClient();
    for (const rec of e.Records || []) {
        const key = rec.s3.object.key;
        let params = {
            TableName: process.env.TABLENAME || "",
            Item: {
                'objectkey': key,
                'timestamp': new Date().toISOString()
            }
        };
        db.put(params, function (err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log(`Written ${key} to db`);
            }
        });
    }
};