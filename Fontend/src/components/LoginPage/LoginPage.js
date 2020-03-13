import React, { Component } from 'react';
import LoginForm from './LoginForm';
import {Tabs, Tab} from 'react-bootstrap-tabs'

import './LoginPage.css';
import NavBar from "../NavBar/NavBar";

class LoginPage extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){}

  handleChange(event){}

  render() {
    return (
        <div className="LoginPage">
          <header className="Login-header">
            <NavBar className="Nav-Bar"/>
            <Tabs className="Tab-Bar">
              <Tab label="User">User</Tab>
              <Tab label="Admin">Admin</Tab>
            </Tabs>
          </header>
          <body className="Login-body">
          <h2>Login</h2>
          <LoginForm />
          </body>
        </div>
    );
  }
}

export default LoginPage;
