import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { theme } from "./styles/Theme";
import GlobalStyle from "./styles/GlobalStyles";

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
