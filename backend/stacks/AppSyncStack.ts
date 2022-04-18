import { AppSyncApi, StackContext } from "@serverless-stack/resources";
// import * as cdk from "aws-cdk-lib";
// import * as appsync from "@aws-cdk/aws-appsync-alpha";

export function AppSyncStack(props: StackContext) {
  const appSync = new AppSyncApi(props.stack, "appsync", {
    graphqlApi: {
      schema: "../graphql/stock.gql",
    },
    // authorizationConfig: {
    //   defaultAuthorization: {
    //     authorizationType: appsync.AuthorizationType.API_KEY,
    //     apiKeyConfig: {
    //       expires: cdk.Expiration.after(cdk.Duration.days(365)),
    //     },
    //   },
    // },
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
    ApiUrl: appSync.graphqlApi.graphqlUrl,
    ApiKey: appSync.graphqlApi.apiKey,
  });

  return appSync;
}
