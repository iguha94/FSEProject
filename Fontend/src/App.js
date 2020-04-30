import React, { Component } from 'react';
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';

import './App.css';


class App extends Component {
  constructor()
  {
      super();
  }
  render() {
    return (
        <div className="App">
        <HomePage>
               <NavBar className="Nav-Bar"/>
        </HomePage>
        </div>
    );
  }
}

export default App;
