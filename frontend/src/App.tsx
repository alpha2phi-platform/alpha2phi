import React from "react";
import { useStockQuery, useStocksQuery } from "./data/urql";
import "./App.css";

const ListStocks = () => {
  const [{ data, fetching, error }] = useStocksQuery();

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      {data?.listStocks?.map((stock) => (
        <div key={stock?.symbol}>
          {stock?.symbol} - {stock?.name}
        </div>
      ))}
    </div>
  );
};

const GetStock = ({ country, symbol }) => {
  const [{ data, fetching, error }] = useStockQuery({
    variables: {
      country: country,
      symbol: symbol,
    },
  });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      {data?.getStockBySymbol?.symbol} - {data?.getStockBySymbol?.name}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <GetStock country="united states" symbol="aapl" />
      {/* <ListStocks /> */}
    </div>
  );
}

export default App;
