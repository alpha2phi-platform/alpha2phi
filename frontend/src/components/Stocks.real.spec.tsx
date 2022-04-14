import React from "react";
import { aliasQuery, hasOperationName } from "../test/utils/graphql-test-utils";
import { createClient, Provider, defaultExchanges } from "urql";
import { mount } from "@cypress/react";
import Stocks from "./Stocks";

context("Stocks real tests", () => {
  beforeEach(() => {
    cy.intercept("POST", import.meta.env.VITE_GRAPHQL_URL, (req) => {
      aliasQuery(req, "Stocks");
    });
  });

  it("render real stocks", () => {
    cy.intercept("POST", import.meta.env.VITE_GRAPHQL_URL, (req) => {
      if (hasOperationName(req, "Stocks")) {
        req.alias = "gqlStocks";
        req.reply(); // Send to destination server
      }
    });

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
    mount(
      <Provider value={client}>
        <Stocks />
      </Provider>
    );

    // Wait for response and check the data length
    cy.wait("@gqlStocks")
      .its("response.body.data.listStocks")
      .should((listStocks) => {
        expect(listStocks.length).to.be.gte(100);
      });

    // Go to next page
    cy.get('button[title="Go to next page"]').click();
  });
});
