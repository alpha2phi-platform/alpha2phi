import React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "./index.css";
import gql from "graphql-tag";
import App from "./App";
import {
  makeOperation,
  createClient,
  Provider,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from "urql";
import { authExchange } from "@urql/exchange-auth";
import { BrowserRouter as Router } from "react-router-dom";
import { Amplify, Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import config from "./config";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
});

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshCredentials($refreshToken: String!) {
    refreshCredentials(refreshToken: $refreshToken) {
      refreshToken
      token
    }
  }
`;

const getAuth = async ({ authState, mutate }) => {
  if (!authState) {
    const user = await Auth.currentAuthenticatedUser();
    if (user instanceof CognitoUser) {
      const cognitoUser = user as CognitoUser;
      const token = cognitoUser
        .getSignInUserSession()
        ?.getAccessToken()
        ?.getJwtToken();
      const refreshToken = cognitoUser
        .getSignInUserSession()
        ?.getRefreshToken()
        ?.getToken();

      if (token && refreshToken) {
        return { token, refreshToken };
      }
    }
    return null;
  }

  const result = await mutate(REFRESH_TOKEN_MUTATION, {
    token: authState?.refreshToken,
  });

  if (result.data?.refreshLogin) {
    initialized = new Date().getTime();
    return {
      token: result.data.refreshLogin.token,
      refreshToken: result.data.refreshLogin.refreshToken,
    };
  }

  const navigate = useNavigate();
  navigate("/login");

  return null;
};

const addAuthToOperation = ({ authState, operation }) => {
  if (!authState || !authState.token) {
    return operation;
  }

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
        Authorization: authState.token,
      },
    },
  });
};

const didAuthError = ({ error: any }) => {
  console.log("error---");
  return error.graphQLErrors.some((e) => e.extensions?.code === "FORBIDDEN");
};

const willAuthError = ({ operation, authState }) => {
  if (!authState) {
    // Detect our login mutation and let this operation through:
    return !(
      operation.kind === "mutation" &&
      // Here we find any mutation definition with the "login" field
      operation.query.definitions.some((definition) => {
        return (
          definition.kind === "OperationDefinition" &&
          definition.selectionSet.selections.some((node) => {
            // The field name is just an example, since signup may also be an exception
            return node.kind === "Field" && node.name.value === "login";
          })
        );
      })
    );
  }
  return false;
};

const client = createClient({
  url: import.meta.env.VITE_GRAPHQL_URL,
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange({
      getAuth,
      addAuthToOperation,
      didAuthError,
      willAuthError,
    }),
    fetchExchange,
  ],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider value={client}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <Router>
          <App />
        </Router>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
);
