import * as sst from "@serverless-stack/resources";

export default class RESTStack extends sst.Stack {
  // Public reference
  api: sst.Api;

  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    // Create a HTTP API
    this.api = new sst.Api(this, "rest", {
      defaultFunctionProps: {
        environment: {
          STOCKS_TABLE: process.env.STOCKS_TABLE ?? "undefined",
        },
      },
      routes: {
        "GET /stocks/{country}/{symbol}": "src/stocks/get.handler",
        "GET /stocks": "src/stocks/list.handler",
      },
    });

    // Grant permissions
    this.api.attachPermissions(["dynamodb"]);

    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}
