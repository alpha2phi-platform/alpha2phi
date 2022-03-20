import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
  Config,
} from "apollo-server-core";
import { ApolloServer, gql } from "apollo-server-lambda";
import { createGQLHandler } from "@serverless-stack/node/graphql";

const IS_LOCAL = !!process.env.IS_LOCAL;

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, it is working!",
  },
};

const config: Config = {
  typeDefs: typeDefs,
  resolvers: resolvers,
  introspection: IS_LOCAL,
  plugins: [
    !IS_LOCAL
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
};

const server = new ApolloServer(config);

export const handler = server.createHandler();
