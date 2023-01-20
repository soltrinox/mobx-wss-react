import React from "react";
import ReactDOM from "react-dom";

import { CoinsProvider } from "./CoinsStore";
import CoinsTable from "./CoinsTable";

import { GlobalProvider } from "./GlobalStore";

const App = () => {
  // return (
  //   <CoinsProvider>
  //     <CoinsTable />
  //   </CoinsProvider>
  // );
  return (
    <GlobalProvider>
      <CoinsTable />
    </GlobalProvider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
