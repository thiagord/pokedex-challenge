import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Navbar from './components/Navbar';

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
     <Navbar/>
    <Router history={history}>
    <App />
    </Router>
  
  </React.StrictMode>,
  document.getElementById('root')
);
