import {
  StackContext,
  use,
  Auth,
  AppSyncApi,
  ViteStaticSite,
} from "@serverless-stack/resources";
import { AppSyncStack } from "./AppSyncStack";
import { AuthStack } from "./AuthStack";

export function FrontendStack(props: StackContext) {
  const graphql: AppSyncApi = use(AppSyncStack);
  const auth: Auth = use(AuthStack);

  const site = new ViteStaticSite(props.stack, "frontend", {
    path: "../frontend",
    environment: {
      VITE_GRAPHQL_URL: graphql.url,
      VITE_REGION: props.app.region,
      VITE_USER_POOL_ID: auth.userPoolId || "",
      VITE_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || "",
      VITE_USER_POOL_CLIENT_ID: auth.userPoolClientId || "",
    },
    typesPath: "src/types/sst-env.d.ts",
  });

  // Show the endpoint in the output
  props.stack.addOutputs({
    ApiEndpoint: graphql.url,
    SiteUrl: site.url,
    Region: props.app.region,
    UserPoolId: auth.userPoolId || "",
    IdentityPoolId: auth.cognitoIdentityPoolId || "",
    UserPoolClientId: auth.userPoolClientId || "",
  });
  return site;
}
