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

const cards = [
		{id: 1, type: "с фуа-гра", description:["10 порций", "мышь в подарок"], weight:"0.5", state:"default",},
		{id: 2, type: "с рыбой", description: ["40 порций", "2 мыши в подарок"], weight:"2", state: "default",},
		{id: 3, type: "с курой", description: ["100 порций", "5 мышей в подарок", "заказчик доволен"], weight: "5", state: "disabled",},
	];

store.dispatch(fetchCards(cards));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
