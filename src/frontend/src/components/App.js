import React, { Component } from 'react';
import { Provider } from 'react-redux';
import smartOutline from 'smart-outline';

import configureStore from '../core/store/configureStore';
import webAudioUtil from '../audio/webAudioUtil';

import devState from '../local-only/dev-state'

import MainPage from './MainPage'

smartOutline.init();

const store = configureStore(devState);
webAudioUtil.connectToStore(store);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainPage /> 
      </Provider>
    );
  }
}

export default App;
