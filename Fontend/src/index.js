import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import LoginPage from './components/LoginPage/LoginPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';


ReactDOM.render(
  <BrowserRouter>
		<Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={LoginPage} />
          <Route path="/registration" component={RegistrationPage} />
		</Switch>
    </BrowserRouter>,
  document.getElementById('root')
);
