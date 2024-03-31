import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";

import store from "./store";
import theme from "./utils/theme";

// Importing page components
import RoutesComponent from "./routes/Routes";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RoutesComponent />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
