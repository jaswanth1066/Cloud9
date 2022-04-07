import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import './index.css'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
