import { StackContext, use, ViteStaticSite } from "@serverless-stack/resources";
import { AppSyncStack } from "./AppSyncStack";
import { AuthStack } from "./AuthStack";

export function FrontendStack(props: StackContext) {
  const graphql = use(AppSyncStack);
  const auth = use(AuthStack);
  const site = new ViteStaticSite(props.stack, "frontend", {
    path: "../frontend",
    environment: {
      REACT_APP_GRAPHQL_URL: graphql.url,
      // REACT_APP_GRAPHQL_API_KEY: graphql.graphqlApi.apiKey,
      REACT_APP_REGION: props.app.region,
      REACT_APP_USER_POOL_ID: auth.cognitoUserPool?.userPoolId || "",
      REACT_APP_IDENTITY_POOL_ID: auth.cognitoCfnIdentityPool.ref,
      REACT_APP_USER_POOL_CLIENT_ID:
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
