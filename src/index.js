import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux"
import {Provider} from "react-redux"
import reducer from "./Store/reducer"

import './index.css';
import {BrowserRouter} from "react-router-dom"

import App from './App';

const store = createStore(reducer)

const app = (
  <BrowserRouter>
   <App/>
  </BrowserRouter>
)

ReactDOM.render(<Provider store={store}>{app}</Provider>
  ,
  document.getElementById('root')
);


