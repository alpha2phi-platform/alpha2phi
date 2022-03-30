import React from "react";
import ReactDOM from "react-dom";
import { createClient, Provider, defaultExchanges } from "urql";
import App from "./App";
import "./index.css";

console.log(import.meta.env.VITE_GRAPHQL_API_KEY);

const client = createClient({
  url: import.meta.env.VITE_GRAPHQL_URL,
  exchanges: defaultExchanges,
  fetchOptions: () => {
    return {
      headers: {
        "x-api-key": import.meta.env.VITE_GRAPHQL_API_KEY,
      },
    };
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
