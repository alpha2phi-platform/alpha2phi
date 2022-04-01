import { expect, it } from "vitest";
import { createClient, Provider, defaultExchanges } from "urql";
import App from "./App";
import {
  render,
  screen,
  waitForElementToBeRemoved,
  userEvent,
} from "./test/utils/test-utils";
import { listStocks } from "./test/mocks/handlers";

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
it("Should return all stocks", async () => {
  render(
    <Provider value={client}>
      <App />
    </Provider>
  );

  await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
  // expect(screen.getByText("Apple", { exact: false })).toBeDefined();

  listStocks.forEach((stock) => {
    expect(screen.getByText(stock.full_name, { exact: false })).toBeDefined();
  });
});
