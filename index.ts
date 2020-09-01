import * as aws from "@pulumi/aws";
import * as config from "./config";
import { infrastructure } from "./infrastructure"
import { standardTags } from "./tags";
import * as lambdas from "./lambda";

const infra = new infrastructure(`${config.projectname}`);

var bucket = aws.s3.Bucket.get("bucket", infra.bucketName);

bucket.onObjectCreated(`${config.projectname}-handler`, new aws.lambda.CallbackFunction(`${config.projectname}-function`, {
    callback: lambdas.onObjectCreatedLambda,
    tags: standardTags,
    environment: {
        variables: {
            TABLENAME: infra.tableName
        }
    },
    runtime: aws.lambda.NodeJS12dXRuntime
}));

// Export the name of the bucket
export const bucketName = infra.bucketName;
export const tableName = infra.tableName;