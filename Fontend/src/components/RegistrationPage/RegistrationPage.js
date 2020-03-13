import React, { Component } from 'react';
import RegistrationForm from './RegistrationForm';

import './RegistrationPage.css';
import NavBar from "../NavBar/NavBar";
import {Tab, Tabs} from "react-bootstrap-tabs";

class RegistrationPage extends Component {
    render() {
        return (
            <div className="RegistrationPage">
                <header className="Reg-header">
                    <NavBar className="Nav-Bar"/>
                    <Tabs className="Tab-Bar">
                        <Tab label="User">User</Tab>
                        <Tab label="Admin">Admin</Tab>
                    </Tabs>
                </header>
                <body className="Reg-body">
                <h2>Register User</h2>
                <RegistrationForm />
                </body>
            </div>
        );
    }
}

export default RegistrationPage;