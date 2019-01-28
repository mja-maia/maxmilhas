import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducers from './main/reducers'
import App from './main/app'

const store = createStore(reducers)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
, document.getElementById('app'))


module.hot.accept();