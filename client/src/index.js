import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createStore from 'utils/store';
import App from 'components/App'
import 'css/styles.css';
import 'css/menuNavStyle.css';
import 'css/main.css';
import { isDev } from 'utils/env';
import registerServiceWorker from 'utils/serviceWorker';

ReactDOM.render(
    <Provider store={createStore()}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
