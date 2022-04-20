import { StackContext, use, ViteStaticSite } from "@serverless-stack/resources";
import { AppSyncStack } from "./AppSyncStack";

export function FrontendStack(props: StackContext) {
  const graphql = use(AppSyncStack);
  const site = new ViteStaticSite(props.stack, "frontend", {
    path: "../frontend",
    environment: {
      VITE_GRAPHQL_URL: graphql.url,
      // VITE_GRAPHQL_API_KEY: graphql.graphqlApi.apiKey,
    },
    typesPath: "src/types/sst-env.d.ts",
  });

  // Show the endpoint in the output
  props.stack.addOutputs({
    ApiEndpoint: graphql.url,
    SiteUrl: site.url,
  });
  return site;
}
