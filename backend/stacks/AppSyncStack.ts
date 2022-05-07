import { AppSyncApi, StackContext, use } from "@serverless-stack/resources";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import { AuthStack } from "./AuthStack";

// import * as cdk from "aws-cdk-lib";

export function AppSyncStack(props: StackContext) {
  const auth = use(AuthStack);

  const graphqlApi = new AppSyncApi(props.stack, "appsync", {
    schema: "../graphql/stock.gql",
    cdk: {
      graphqlApi: {
        authorizationConfig: {
          defaultAuthorization: {
            authorizationType: appsync.AuthorizationType.USER_POOL,
            userPoolConfig: {
              userPool: auth?.cdk.userPool,
            },
          },
        },
      },
    },
    defaults: {
      function: {
        // Pass the table name to the function
        environment: {
          STOCKS_TABLE: process.env.STOCKS_TABLE ?? "stocks",
        },
        timeout: 900,
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

  graphqlApi.attachPermissions(["dynamodb"]);

  // Show the endpoint in the output
  props.stack.addOutputs({
    ApiEndpoint: graphqlApi.url,
    ApiId: graphqlApi.apiId,
    ApiUrl: graphqlApi.url,
  });

  return graphqlApi;
}
