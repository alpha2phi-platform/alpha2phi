import React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Amplify } from "aws-amplify";
import config from "./config";
import { client } from "./libs/auth";
import { Provider } from "urql";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <Router>
        <Provider value={client}>
          <App />
        </Provider>
      </Router>
    </StyledEngineProvider>
  </React.StrictMode>
);
