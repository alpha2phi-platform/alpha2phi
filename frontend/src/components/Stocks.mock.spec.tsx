import React from "react";
import { aliasQuery, hasOperationName } from "../test/utils/graphql-test-utils";
import { createClient, Provider, defaultExchanges } from "urql";
import { mount } from "@cypress/react";
import Stocks from "./Stocks";

context("Stocks mock tests", () => {
  beforeEach(() => {
    cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
      aliasQuery(req, "Stocks");
    });
  });

  it("render mock stocks", () => {
    cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
      if (hasOperationName(req, "Stocks")) {
        req.alias = "gqlStocks";
        req.reply({
          data: {
            listStocks: [
              {
                currency: "USD",
                symbol: "A",
                full_name: "Agilent Technologies Inc",
                name: "Agilent Technologies",
                country: "united states",
                isin: "US00846U1016",
              },
              {
                currency: "USD",
                symbol: "AA",
                full_name: "Alcoa Corp",
                name: "Alcoa",
                country: "united states",
                isin: "US0138721065",
              },
              {
                currency: "USD",
                symbol: "AACAY",
                full_name: "AACT echnologies Holdings Inc",
                name: "AAC Technologies Holdings Inc",
                country: "united states",
                isin: "US0003041052",
              },
              {
                currency: "USD",
                symbol: "AACG",
                full_name: "ATA Inc",
                name: "ATA",
                country: "united states",
                isin: "US00211V1061",
              },
              {
                currency: "USD",
                symbol: "AAGIY",
                full_name: "AIA Group Ltd ADR",
                name: "AIA ADR",
                country: "united states",
                isin: "US0013172053",
              },
              {
                currency: "USD",
                symbol: "AAL",
                full_name: "American Airlines Group",
                name: "American Airlines",
                country: "united states",
                isin: "US02376R1023",
              },
              {
                currency: "USD",
                symbol: "AAMC",
                full_name: "Altisource Asset Management Corp",
                name: "Altisource Asset Management",
                country: "united states",
                isin: "VI02153X1080",
              },
              {
                currency: "USD",
                symbol: "AAME",
                full_name: "Atlantic American Corporation",
                name: "Atlantic American",
                country: "united states",
                isin: "US0482091008",
              },
              {
                currency: "USD",
                symbol: "AAN",
                full_name: "Aarons Inc",
                name: "Aarons",
                country: "united states",
                isin: "US0025353006",
              },
              {
                currency: "USD",
                symbol: "AAOI",
                full_name: "Applied Opt",
                name: "Applied Opt",
                country: "united states",
                isin: "US03823U1025",
              },
              {
                currency: "USD",
                symbol: "GOOGL",
                full_name: "Alphabet Inc",
                name: "Alphabet Inc",
                country: "united states",
                isin: "US03823U1027",
              },
            ],
          },
        });
      }
    });

    const client = createClient({
      url: "http://localhost:4000/graphql",
      exchanges: defaultExchanges,
      fetchOptions: () => {
        return {
          headers: {
            "x-api-key": "testing key",
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
        expect(listStocks.length).to.be.gte(1);
      });

    // Go to next page
    cy.get('button[title="Go to next page"]').click();

    cy.contains("GOOGL");
  });
});

