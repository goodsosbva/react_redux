import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import storeProvider from "./Context";

ReactDOM.render(
  <storeProvider>
    <App />
  </storeProvider>,
  document.querySelector("#root")
);
