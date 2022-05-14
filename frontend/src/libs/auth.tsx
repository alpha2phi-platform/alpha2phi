// import gql from "graphql-tag";
import {
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  makeOperation,
} from "urql";
import { authExchange } from "@urql/exchange-auth";
import { Cognito } from "@serverless-stack/web";
import config from "../config";

export const cognito = new Cognito({
  UserPoolId: config.cognito.USER_POOL_ID,
  ClientId: config.cognito.APP_CLIENT_ID,
});

const getAuth = async ({ authState, mutate }) => {
  // try {
  //   if (!authState) {
  //     const session = cognito.session;
  //     const token = session?.getAccessToken().getJwtToken();
  //     const refreshToken = session?.getRefreshToken().getToken();
  //     if (token && refreshToken) {
  //       return { token, refreshToken };
  //     }
  //     return null;
  //   }
  //
  //   return null;
  // } catch (e: unknown) {
  //   return null;
  // }
  return null;
};

const addAuthToOperation = ({ authState, operation }) => {
  const session = cognito.session;
  if (!session) {
    return operation;
  }

  // if (!authState || !authState.token) {
  //   return operation;
  // }

  const fetchOptions =
    typeof operation.context.fetchOptions === "function"
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: session.getAccessToken().getJwtToken(),
      },
    },
  });
};

export const client = createClient({
  url: import.meta.env.VITE_GRAPHQL_URL,
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange({
      getAuth,
      addAuthToOperation,
    }),
    fetchExchange,
  ],
});
