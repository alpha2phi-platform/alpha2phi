import { GraphQLApi, StackContext } from "@serverless-stack/resources";

export function GraphqlStack(props: StackContext) {
  const graphql = new GraphQLApi(props.stack, "graphql", {
    server: {
      handler: "functions/graphql/graphql.handler",
      permissions: ["dynamodb"],
      environment: {
        STOCKS_TABLE: process.env.STOCKS_TABLE ?? "stocks",
      },
    },
  });

  // Show the endpoint in the output
  props.stack.addOutputs({
    ApiEndpoint: graphql.url,
  });

  return graphql;
}
