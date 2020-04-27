import React, { Component } from 'react';
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';

import './App.css';


class App extends Component {
  constructor()
  {
      console.log('here')
      super();
  }
  render() {
    return (
        <div className="App">
            <header className="Home-header">
               <NavBar className="Nav-Bar"/>
            </header>,
            <HomePage/>
        </div>
    );
  }
}

export default App;
