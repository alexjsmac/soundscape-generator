import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import smartOutline from 'smart-outline';
import configureStore from './core/store/configureStore';
import webAudioUtil from './audio/webAudioUtil';
import App from './components/App';
import './styles/index.css';

import devState from './local-only/dev-state'
const store = configureStore(devState);
webAudioUtil.connectToStore(store);

smartOutline.init();

ReactDOM.render(
    <Provider store={store}>
        <App /> 
    </Provider>,
    document.getElementById('root')
);
