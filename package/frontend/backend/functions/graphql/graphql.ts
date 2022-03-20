import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
  Config,
} from "apollo-server-core";
import { ApolloServer, gql } from "apollo-server-lambda";

const IS_LOCAL = !!process.env.IS_LOCAL;

const typeDefs = gql`
  type Query {
    hello: String
    stocks: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, it is working!",
    stocks: async (parent, args, context, info) => {
      console.dir(parent);
      console.dir(args);
      console.dir(context);
      console.dir(info);
      return "hello stocks";
    },
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
