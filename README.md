# Pulumi serverless

## Run

`pulumi up --policy-pack ./policypack`

## Test

`aws s3 cp ./file.txt s3://${pulumi stack output bucketName}/file.txt`

or if you're on zsh, you'll need to use ` for substitution:

```
aws s3 cp ./file.txt s3://`pulumi stack output bucketName`/file.txt
```

# When finished

```
aws s3 rm s3://`pulumi stack output bucketName` --recursive
```

or `aws s3 rm s3://${pulumi stack output bucketName} --recursive` if you're not on zsh

`pulumi destory`