import { Api, StackContext, use } from "@serverless-stack/resources";

export function ApiStack(props: StackContext) {
  // Create a HTTP API
  const api = new Api(props.stack, "api", {
    defaultFunctionProps: {
      environment: {
        STOCKS_TABLE: process.env.STOCKS_TABLE ?? "",
      },
    },
    routes: {
      "GET /stocks/{country}/{symbol}": "/stocks/get.handler",
      "GET /stocks": "src/stocks/list.handler",
    },
  });

  // Grant permissions
  api.attachPermissions(["dynamodb"]);

  // Show the endpoint in the output
  props.stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
