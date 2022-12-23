import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { theme } from "./styles/theme";
import GlobalStyle from "./styles/global-styles";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
