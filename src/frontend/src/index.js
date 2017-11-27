import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './core/store/configureStore';
import App from './components/App';
import webAudioUtil from './audio/webAudioUtil';
import './styles/index.css';

const store = configureStore();
webAudioUtil.connectToStore(store);

ReactDOM.render(
    // <div>hey</div>,
    <Provider store={store}>
        <App /> 
    </Provider>,
    document.getElementById('root')
);
