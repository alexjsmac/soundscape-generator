import React, { Component } from 'react';
// redux
import { Provider } from 'react-redux';
import configureStore from '../core/store/configureStore';

// styled components
import { ThemeProvider } from 'styled-components';
import theme from './theme';

// helpers / app specifics
import smartOutline from 'smart-outline';
import webAudioUtil from '../audio/webAudioUtil';

// components
import MainPage from './MainPage'

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
