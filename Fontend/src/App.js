import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  withRouter
} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import NavBar from './components/NavBar/NavBar';

import './App.css';


class App extends Component {
  constructor()
  {
      super();
      console.log('bsdk chal ja');
  }
  render() {
    return (
        <div className="App">
          [

            <header className="Home-header">
               <NavBar className="Nav-Bar"/>
            </header>,
            <HomePage/>
          ]
        </div>
    );
  }
}

export default App;
