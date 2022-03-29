import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getStockBySymbol?: Maybe<Stock>;
  listStocks?: Maybe<Array<Maybe<Stock>>>;
};


export type QueryGetStockBySymbolArgs = {
  country: Scalars['String'];
  symbol: Scalars['String'];
};

export type Stock = {
  __typename?: 'Stock';
  country: Scalars['String'];
  currency?: Maybe<Scalars['String']>;
  full_name?: Maybe<Scalars['String']>;
  isin?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  symbol: Scalars['String'];
};

export type StocksQueryVariables = Exact<{ [key: string]: never; }>;


export type StocksQuery = { __typename?: 'Query', listStocks?: Array<{ __typename?: 'Stock', country: string, symbol: string, currency?: string | null, full_name?: string | null, isin?: string | null, name?: string | null } | null> | null };

export type StockQueryVariables = Exact<{
  country: Scalars['String'];
  symbol: Scalars['String'];
}>;


export type StockQuery = { __typename?: 'Query', getStockBySymbol?: { __typename?: 'Stock', country: string, symbol: string, currency?: string | null, full_name?: string | null, isin?: string | null, name?: string | null } | null };


export const StocksDocument = gql`
    query Stocks {
  listStocks {
    country
    symbol
    currency
    full_name
    isin
    name
  }
}
    `;

export function useStocksQuery(options?: Omit<Urql.UseQueryArgs<StocksQueryVariables>, 'query'>) {
  return Urql.useQuery<StocksQuery>({ query: StocksDocument, ...options });
};
export const StockDocument = gql`
    query Stock($country: String!, $symbol: String!) {
  getStockBySymbol(country: $country, symbol: $symbol) {
    country
    symbol
    currency
    full_name
    isin
    name
  }
}
    `;

export function useStockQuery(options: Omit<Urql.UseQueryArgs<StockQueryVariables>, 'query'>) {
  return Urql.useQuery<StockQuery>({ query: StockDocument, ...options });
};