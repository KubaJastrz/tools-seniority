import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { App } from "./App";
import "windi.css";
import "./main.css";

ReactDOM.render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </StrictMode>,
  document.getElementById("root"),
);
