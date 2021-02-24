import { StrictMode } from 'react';
import ReactDOM from "react-dom";
import { App } from "./App";
import "windi.css";
import "./main.css";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root"),
);
