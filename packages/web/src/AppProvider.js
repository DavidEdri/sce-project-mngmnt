import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PropTypes from "prop-types";

// RTL
import { create } from "jss";
import preset from "jss-preset-default";
import rtl from "jss-rtl";
import { createMuiTheme } from "@material-ui/core/styles";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThemeProvider, StylesProvider } from "@material-ui/styles";
import { isRTL } from "./utils/constants";

function AppProvider({ children }) {
  const theme = createMuiTheme({
    direction: isRTL ? "rtl" : "ltr"
  });

  const presets = preset().plugins;
  const jss = create({ plugins: [...presets, isRTL ? rtl() : null] });

  document.body.style.direction = isRTL ? "rtl" : "ltr";

  return (
    <Router>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </StylesProvider>
    </Router>
  );
}

AppProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default AppProvider;
