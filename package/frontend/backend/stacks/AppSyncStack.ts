import { AppSyncApi, StackContext } from "@serverless-stack/resources";

export function AppSyncStack(props: StackContext) {
  const appSync = new AppSyncApi(props.stack, "appsync", {
    graphqlApi: {
      schema: "../graphql/schema.gql",
    },
    defaultFunctionProps: {
      // Pass the table name to the function
      environment: {
        STOCKS_TABLE: process.env.STOCKS_TABLE ?? "stocks",
      },
    },
    dataSources: {
      stocks: "functions/appsync/appsync.handler",
    },
    resolvers: {
      "Query    listStocks": "stocks",
      "Query    getStockBySymbol": "stocks",
    },
  });

  appSync.attachPermissions(["dynamodb"]);

  // Show the endpoint in the output
  props.stack.addOutputs({
    ApiEndpoint: appSync.url,
    ApiId: appSync.graphqlApi.apiId,
  });

  return appSync;
}
