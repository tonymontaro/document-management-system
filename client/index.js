import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { getDocuments } from './actions//documentActions';
import { getRoles } from './actions/roleActions';
import { loginSuccess } from './actions/accessActions';
import configureStore from './store/configureStore';
import routes from './routes';
import './scss/style.scss';

const store = configureStore();
const token = localStorage.getItem('jwToken');
if (token) {
  store.dispatch(loginSuccess(token));
}
store.dispatch(getDocuments());
store.dispatch(getRoles());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.getElementById('app')
);
