import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Providers from "./Providers.tsx";
import "@formatjs/intl-durationformat/polyfill";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
