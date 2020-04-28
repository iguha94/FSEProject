import React, { Component } from 'react';
import './HomePage.css';
import {Panel} from "react-bootstrap";

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
};

const panelStyle = {
    backgroundColor: 'rgba(255,255,255,0.5)',
    border: 0,
    paddingLeft: 20,
    paddingRight: 20,
};

class HomePage extends Component{
    render() {
        return (
            <div style={divStyle} className="HomePage">
                <Panel style={panelStyle}>
                    <div className="Home-body">
                        <h1 className="Home-title"> Help Someone In Need, Today</h1>
                    </div>
                </Panel>
            </div>
        );
    }
}

export default HomePage;