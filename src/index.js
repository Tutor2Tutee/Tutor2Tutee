import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./client/Root";

import reportWebVitals from './reportWebVitals';
import { createStore,combineReducers } from 'redux'
import { Provider } from 'react-redux'
import authReducer from './store/reducers/auth'

const rootReducer = combineReducers({
  auth:authReducer
})

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
