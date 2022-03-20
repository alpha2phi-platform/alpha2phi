import { RemovalPolicy } from "aws-cdk-lib";
import * as sst from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";
import { GraphqlStack } from "./GraphqlStack";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x",
    srcPath: "backend",
    environment: {
      STAGE: app.stage,
      APP_NAME: app.name,
    },
  });

  if (app.local) app.setDefaultRemovalPolicy(RemovalPolicy.DESTROY);

  app
    // .stack(ApiStack)
    .stack(GraphqlStack);
}
