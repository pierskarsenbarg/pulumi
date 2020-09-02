import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';
import { Output } from '@pulumi/pulumi';
import {standardTags} from './tags';

class infrastructure extends pulumi.ComponentResource {
    bucketName: Output<string>;
    tableName: Output<string>;
    constructor(name: string) {
        super(`${name}:infrastructure`, name, {});

        // Create an AWS resource (S3 Bucket)
        const bucket = new aws.s3.Bucket(`${name}-bucket`, {
            tags: {
                ...standardTags,
                Name: `${name}-bucket`
            },
            acl: "private",
            versioning: 
            {
                enabled: true
            }
        });

        // Create DynamoDB table
        const ddb = new aws.dynamodb.Table(`${name}-table`, {
            hashKey: 'objectkey',
            rangeKey: 'timestamp',
            attributes: [
                { name: 'objectkey', type: 'S' },
                { name: 'timestamp', type: 'S' }
            ],
            billingMode: 'PAY_PER_REQUEST',
            tags: {
                ...standardTags,
                Name: `${name}-table`
            }
        });

        this.bucketName = bucket.id;
        this.tableName = ddb.name;

        this.registerOutputs();
    }
}

export { infrastructure };