// import gql from "graphql-tag";
import {
  // makeOperation,
  createClient,
  // dedupExchange,
  // cacheExchange,
  // fetchExchange,
} from "urql";
// import { authExchange } from "@urql/exchange-auth";
import { Cognito } from "@serverless-stack/web";
import config from "../config";

// import { Auth } from "aws-amplify";

// const REFRESH_TOKEN_MUTATION = gql`
//   mutation RefreshCredentials($refreshToken: String!) {
//     refreshCredentials(refreshToken: $refreshToken) {
//       refreshToken
//       token
//     }
//   }
// `;
//
// const getAuth = async ({ authState, mutate }) => {
//   try {
//     if (!authState) {
//       const session = await Auth.currentSession();
//       const token = session.getAccessToken().getJwtToken();
//       const refreshToken = session.getRefreshToken().getToken();
//       if (token && refreshToken) {
//         return { token, refreshToken };
//       }
//       return null;
//     }
//
//     const result = await mutate(REFRESH_TOKEN_MUTATION, {
//       refreshToken: authState.refreshToken,
//     });
//
//     if (result.data?.refreshCredentials) {
//       return result.data.refreshCredentials;
//     }
//
//     return null;
//   } catch (e: unknown) {
//     return null;
//   }
// };
//
// const addAuthToOperation = ({ authState, operation }) => {
//   if (!authState || !authState.token) {
//     return operation;
//   }
//
//   const fetchOptions =
//     typeof operation.context.fetchOptions === "function"
//       ? operation.context.fetchOptions()
//       : operation.context.fetchOptions || {};
//
//   return makeOperation(operation.kind, operation, {
//     ...operation.context,
//     fetchOptions: {
//       ...fetchOptions,
//       headers: {
//         ...fetchOptions.headers,
//         Authorization: authState.token,
//       },
//     },
//   });
// };

// const didAuthError = ({ error: any }) => {
//   return error.graphQLErrors.some((e) => e.extensions?.code === "FORBIDDEN");
// };
//
// const willAuthError = ({ operation, authState }) => {
//
//   if (!authState) {
//     // Detect our login mutation and let this operation through:
//     return !(
//       operation.kind === "mutation" &&
//       // Here we find any mutation definition with the "login" field
//       operation.query.definitions.some((definition) => {
//         return (
//           definition.kind === "OperationDefinition" &&
//           definition.selectionSet.selections.some((node) => {
//             // The field name is just an example, since signup may also be an exception
//             return node.kind === "Field" && node.name.value === "login";
//           })
//         );
//       })
//     );
//   }
//   return false;
// };

// export const client = createClient({
//   url: import.meta.env.VITE_GRAPHQL_URL,
//   exchanges: [
//     dedupExchange,
//     cacheExchange,
//     authExchange({
//       getAuth,
//       addAuthToOperation,
//       // didAuthError,
//       // willAuthError,
//     }),
//     fetchExchange,
//   ],
// });

const cognito = new Cognito({
  UserPoolId: config.cognito.USER_POOL_ID,
  ClientId: config.cognito.APP_CLIENT_ID,
});

export const client = createClient({
  url: import.meta.env.VITE_GRAPHQL_URL,
  fetchOptions: () => {
    const token = cognito.session?.getAccessToken().getJwtToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});
