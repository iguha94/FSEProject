import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import './HomePage.css';

class HomePage extends Component{
    render() {
        return (
            <div className="HomePage">
                <header className="Home-header">
                    <NavBar className={"Nav-Bar"}/>
                </header>
                <body className="Home-body">
                    <h2>Home Page</h2>
                </body>
            </div>
        );
    }
}

export default HomePage;