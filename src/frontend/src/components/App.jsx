import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import configureStore from "../core/store/configureStore";
import webAudioUtil from "../audio/webAudioUtil";
import theme from "./theme";
import MainPage from "./MainPage";

const store = configureStore();

const App = () => {
  useEffect(() => {
    webAudioUtil.connectToStore(store);
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MainPage />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
