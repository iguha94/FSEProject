import React, { Component } from 'react';
import './HomePage.css';
import {Panel} from "react-bootstrap";

const divStyle = {
    display: 'table',
    alignItems: 'center',
    margin: 'auto',
};

const panelStyle = {
    backgroundColor: 'rgba(255,255,255,0.5)',
    border: 0,
    paddingLeft: 20,
    paddingRight: 20,
    width: 300,
};

class HomePage extends Component{
    render() {
        return (
            <div style={divStyle} className="HomePage">
                <Panel style={panelStyle}>

                    <body className="Home-body">
                        <h2>Home Page</h2>
                        <div className="search-input">
                            <input type="text" className="search-input" placeholder="Search..." />
                            <ul>
                            </ul>
                        </div>
                    </body>
                </Panel>
            </div>
        );
    }
}

export default HomePage;