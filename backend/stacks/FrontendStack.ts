import { StackContext, use, ViteStaticSite } from "@serverless-stack/resources";
import { AppSyncStack } from "./AppSyncStack";
import { AuthStack } from "./AuthStack";

export function FrontendStack(props: StackContext) {
  const graphql = use(AppSyncStack);
  const auth = use(AuthStack);
  const site = new ViteStaticSite(props.stack, "frontend", {
    path: "../frontend",
    environment: {
      VITE_GRAPHQL_URL: graphql.url,
      // VITE_GRAPHQL_API_KEY: graphql.graphqlApi.apiKey,
      VITE_REGION: props.app.region,
      VITE_USER_POOL_ID: auth.cognitoUserPool?.userPoolId || "",
      VITE_IDENTITY_POOL_ID: auth.cognitoCfnIdentityPool.ref,
      VITE_USER_POOL_CLIENT_ID:
        auth.cognitoUserPoolClient?.userPoolClientId || "",
    },
    typesPath: "src/types/sst-env.d.ts",
  });

  // Show the endpoint in the output
  props.stack.addOutputs({
    ApiEndpoint: graphql.url,
    SiteUrl: site.url,
    Region: props.app.region,
    UserPoolId: auth.cognitoUserPool?.userPoolId || "",
    IdentityPoolId: auth.cognitoCfnIdentityPool.ref,
    UserPoolClientId: auth.cognitoUserPoolClient?.userPoolClientId || "",
  });
  return site;
}
