import React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "./index.css";
import App from "./App";
import { createClient, Provider, defaultExchanges } from "urql";

console.log("----", import.meta.env.REACT_APP_GRAPHQL_URL);

const client = createClient({
  url: import.meta.env.REACT_APP_GRAPHQL_URL,
  exchanges: defaultExchanges,
  fetchOptions: () => {
    return {
      headers: {
        "x-api-key": import.meta.env.REACT_APP_GRAPHQL_API_KEY,
      },
    };
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider value={client}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <App />
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
);
