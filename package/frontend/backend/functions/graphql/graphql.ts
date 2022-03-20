import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
  Config,
} from "apollo-server-core";
import { ApolloServer, gql } from "apollo-server-lambda";
import dynamoDb from "../../core/dynamodb";
import context from "../../core/context";
import { GetItemInput, ScanInput } from "aws-sdk/clients/dynamodb";

const IS_LOCAL = !!process.env.IS_LOCAL;

const STOCKS_TABLE = context.getResource(process.env.STOCKS_TABLE);

const typeDefs = gql`
  type Stock {
    country: String!
    symbol: String!
    currency: String
    full_name: String
    isin: String
    name: String
  }

  type Query {
    hello: String
    stocks(country: String, symbol: String): [Stock]
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, it is working!",

    stocks: async (parent, args, ctx, info) => {
      if (args.country && args.symbol) {
        const params: GetItemInput = {
          TableName: STOCKS_TABLE,
          Key: {
            country: args.country.toLowerCase(),
            symbol: args.symbol.toUpperCase(),
          },
        };
        const result = await dynamoDb.get(params);
        if (result.Item) {
          return Array.of(result.Item);
        } else {
          return [];
        }
      } else {
        const params: ScanInput = {
          TableName: STOCKS_TABLE,
          Select: "ALL_ATTRIBUTES",
          Limit: 10,
        };
        const result = await dynamoDb.scan(params);
        return result.Items;
      }
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
