import { Api, StackContext } from "@serverless-stack/resources";

export function ApiStack(props: StackContext) {
  // Create a HTTP API
  const api = new Api(props.stack, "api", {
    defaults: {
      function: {
        environment: {
          STOCKS_TABLE: process.env.STOCKS_TABLE ?? "stocks",
        },
      },
    },
    routes: {
      "GET /stocks/{country}/{symbol}": "functions/api/stocks/get.handler",
      "GET /stocks": "functions/api/stocks/list.handler",
    },
  });

  // Grant permissions
  api.attachPermissions(["dynamodb"]);

  // Show the endpoint in the output
  props.stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return api;
}
