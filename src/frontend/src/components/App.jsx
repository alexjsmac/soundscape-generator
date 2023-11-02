import React, { Component } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import smartOutline from "smart-outline";

import configureStore from "../core/store/configureStore";
import webAudioUtil from "../audio/webAudioUtil";
import theme from "./theme";
import MainPage from "./MainPage";

// TEMP
// import devState from '../local-only/dev-state'

const store = configureStore();
webAudioUtil.connectToStore(store);

smartOutline.init();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MainPage />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
