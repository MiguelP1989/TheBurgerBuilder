import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from "redux"
import {Provider} from "react-redux"
import ingredientsReducer from "./Store/Reducer/ingredients"
import orderReducer from "./Store/Reducer/order"
import thunk from 'redux-thunk'

import './index.css';
import {BrowserRouter} from "react-router-dom"

import App from './App';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  ingredientsReducer: ingredientsReducer,
  orderReducer: orderReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
  <BrowserRouter>
   <App/>
  </BrowserRouter>
)

ReactDOM.render(<Provider store={store}>{app}</Provider>
  ,
  document.getElementById('root')
);


