import React, { Component } from 'react';
import RegistrationForm from './RegistrationForm';

import './RegistrationPage.css';
import NavBar from "../NavBar/NavBar";
import {Tab, Tabs} from "react-bootstrap-tabs";

class RegistrationPage extends Component {

    constructor(props){
        super(props);
        this.reRoute = this.reRoute.bind(this);
      }

    reRoute(path){
        console.log('Registration Page, Path:', path);
        this.props.history.push(path);
    }

    render() {
        return (
            <div className="RegistrationPage">
                <NavBar className="Nav-Bar"/>
                <h2 className = "Reg-title">Register User</h2>
                <RegistrationForm reRoute={this.reRoute}/>
            </div>
        );
    }
}

export default RegistrationPage;