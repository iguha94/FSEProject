import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';

import './App.css';

const Home = () => (
  <HomePage />
);

const Login = () => (
  <LoginPage />
);

const Registration = () => (
    <RegistrationPage />
);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
        </div>
      </Router>
    );
  }
}

export default App;
