import React from "react";
import Stocks from "../../../frontend/src/components/Stocks";

export default {
  title: "Stocks",
  component: Stocks,
};

const Template = (args) => <Stocks {...args} />;

export const ListStocks = Template.bind({});

ListStocks.parameters = {
  urql: () => ({
    data: {
      listStocks: [
        { name: "Apple", symbol: "AAPL", country: "united states" },
        { name: "Tesla", symbol: "TSLA", country: "united states" },
        { name: "Alphabet", symbol: "GOOGL", country: "united states" },
      ],
    },
  }),
};
