import { StackContext, use, ViteStaticSite } from "@serverless-stack/resources";
import { AppSyncStack } from "./AppSyncStack";

export function FrontendStack(props: StackContext) {
  const graphql = use(AppSyncStack);
  const site = new ViteStaticSite(props.stack, "frontend", {
    path: "frontend",
    environment: {
      VITE_GRAPHQL_URL: graphql.url,
    },
  });

  return site;
}
