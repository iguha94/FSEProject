import ReactDOM from 'react-dom';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import './index.css';
import App from './App';
import LoginPage from './components/LoginPage/LoginPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import QueryPage from './components/QueryPage/QueryPage';


ReactDOM.render(
  <BrowserRouter>
		<Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={LoginPage} />
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/query" component={QueryPage} />
		</Switch>
    </BrowserRouter>,
  document.getElementById('root')
);
