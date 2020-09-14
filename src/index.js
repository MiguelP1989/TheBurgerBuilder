import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from "redux"
import {Provider} from "react-redux"
import reducer from "./Store/Reducer/ingredients"
import thunk from 'redux-thunk'

import './index.css';
import {BrowserRouter} from "react-router-dom"

import App from './App';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
  <BrowserRouter>
   <App/>
  </BrowserRouter>
)

ReactDOM.render(<Provider store={store}>{app}</Provider>
  ,
  document.getElementById('root')
);


