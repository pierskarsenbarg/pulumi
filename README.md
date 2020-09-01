# Pulumi serverless

## Run

`pulumi up`

## Test

`aws s3 cp ./file.txt s3://${pulumi stack output bucketName}/file.txt`

or if you're on zsh, you'll need to use ` for substitution:

```
aws s3 cp ./file.txt s3://`pulumi stack output bucketName`/file.txt
```