import { gql, ApolloServer } from "apollo-server-lambda";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  Config,
} from "apollo-server-core";
const IS_LOCAL = !!process.env.IS_LOCAL;

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, New World!",
  },
};

const config: Config = {
  typeDefs: typeDefs,
  resolvers: resolvers,
  introspection: IS_LOCAL,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground(IS_LOCAL)],
};

const server = new ApolloServer(config);

export const handler = server.createHandler();
