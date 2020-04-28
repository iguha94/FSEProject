import React, {Component, useRef} from 'react';
import './HomePage.css';
import {Panel} from "react-bootstrap";
import Heading from "../Heading/Heading";
import NavBar from "../NavBar/NavBar";

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
            <div style={divStyle} className= "wrapper">
                <Panel style={panelStyle}>
                    <div className="Home-body">
                        <Heading text="Help Someone in Need, Today" arc={100} radius={650} />
                    </div>
                </Panel>
            </div>
        );
    }
}

export default HomePage;