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
    this.reRoute = this.reRoute.bind(this);
  }

  handleSubmit(e){}

  handleChange(e){}

  reRoute(path){
      console.log('LoginPage, Path:', path);
      this.props.history.push(path);
  }

  render() {
    return (
        <div className="LoginPage">
          <header className="Login-header">
            <NavBar className="Nav-Bar"/>
            <Tabs className="Tab-Bar">
              <Tab label="User"></Tab>
              <Tab label="Admin"></Tab>
            </Tabs>
          </header>
          <h2>Login</h2>
          <LoginForm reRoute={this.reRoute}/>
        </div>
    );
  }
}

export default LoginPage;
