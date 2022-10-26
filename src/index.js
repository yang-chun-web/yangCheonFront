import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ResetCSS from "./styles/reset";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <ResetCSS />
    <App />
  </RecoilRoot>
);
