import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import './css/styles.css';
import App from './components/App.jsx';
import reducers from './reducers/index.js';
import { fetchCards } from './actions/index.js';
import thunk from 'redux-thunk';

const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
const store = createStore(
	reducers,
	compose(
		applyMiddleware(thunk),
		devtoolMiddleware,
	),
);

store.dispatch(fetchCards());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
