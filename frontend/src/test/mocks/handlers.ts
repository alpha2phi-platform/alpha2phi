import { graphql } from "msw";

// Mock Data
export const listStocks = [
  {
    country: "united states",
    symbol: "A",
    currency: "USD",
    full_name: "Agilent",
    isin: "US00",
    name: "Agilent",
  },
  {
    country: "united states",
    symbol: "AAPL",
    currency: "USD",
    full_name: "Apple",
    isin: "US00",
    name: "Apple",
  },
];

const graphqlHandler = graphql.link("http://localhost:4000/graphql");

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [
  graphqlHandler.query("Stocks", (req, res, ctx) => {
    return res(
      ctx.data({
        listStocks,
      })
    );
  }),
];
