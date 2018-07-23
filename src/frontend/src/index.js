import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/index.css';

const rootEl = document.getElementById('root')
ReactDOM.render(<App />, rootEl);

if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default
        ReactDOM.render( <
            NextApp / > ,
            rootEl
        )
    })
}
