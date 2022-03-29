import { useState } from "react";
import logo from "./logo.svg";
import { useStocksQuery } from "./data/urql";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  console.log(import.meta.env.VITE_GRAPHQL_URL);

  const Stocks = () => {
    console.log("testng");
    const { result } = useStocksQuery();
    console.log("result", result);
  };

  Stocks();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
