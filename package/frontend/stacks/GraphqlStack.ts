import * as sst from "@serverless-stack/resources";

export default class GraphQLStack extends sst.Stack {
  api: sst.GraphQLApi;

  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    // Create the GraphQL API
    this.api = new sst.GraphQLApi(this, "graphql", {
      server: "src/graphql.handler",
    });

    // Show the API endpoint in output
    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}
