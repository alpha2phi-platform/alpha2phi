import { HttpMethods } from "aws-cdk-lib/aws-s3";
import { Bucket, StackContext } from "@serverless-stack/resources";

export function StorageStack(props: StackContext) {
  const bucket = new Bucket(props.stack, "storage");
  bucket.cdk.bucket.addCorsRule({
    allowedMethods: [HttpMethods.PUT],
    allowedOrigins: ["*"],
    allowedHeaders: ["*"],
  });

  return bucket;
}
