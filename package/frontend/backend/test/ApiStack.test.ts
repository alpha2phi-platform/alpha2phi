import { Template } from "aws-cdk-lib/assertions";
import * as sst from "@serverless-stack/resources";
import ApiStack from "../stacks/ApiStack";

test("Test Stack", () => {
  const app = new sst.App();
  // WHEN
  const stack = new ApiStack(app, "api");
  // THEN
  const template = Template.fromStack(stack);
  template.resourceCountIs("AWS::Lambda::Function", 1);
});
