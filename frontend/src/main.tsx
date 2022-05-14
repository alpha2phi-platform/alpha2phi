import React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { client, cognito } from "./libs/auth";
import { Provider } from "urql";
import { CognitoProvider } from "@serverless-stack/web";

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
