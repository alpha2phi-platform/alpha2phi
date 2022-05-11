import React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import config from "./config";
import { client } from "./libs/auth";
import { Provider } from "urql";
import { Cognito, CognitoProvider } from "@serverless-stack/web";

const cognito = new Cognito({
  UserPoolId: config.cognito.USER_POOL_ID,
  ClientId: config.cognito.APP_CLIENT_ID,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <Router>
        <Provider value={client}>
          <CognitoProvider value={cognito}>
            <App />
          </CognitoProvider>
        </Provider>
      </Router>
    </StyledEngineProvider>
  </React.StrictMode>
);
