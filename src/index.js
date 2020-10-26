import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./Styles/GlobalStyles";
import theme from "./Styles/theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Routes />
  </ThemeProvider>,
  document.getElementById("root")
);
