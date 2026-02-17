import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CvProvider } from "./context/CvContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CvProvider>
        <App />
      </CvProvider>
    </BrowserRouter>
  </React.StrictMode>
);
