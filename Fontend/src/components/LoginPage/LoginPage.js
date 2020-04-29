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

  reRoute(path,sessval){
      console.log('LoginPage, Path:', path);
      window.location.href = path;
  }

  render() {
    return (
        <div className="LoginPage">
            <NavBar className="Nav-Bar"/>
          <h2 className = "title">Login</h2>
            <div className = "formDiv">
          <LoginForm reRoute={this.reRoute}/>
            </div>
        </div>
    );
  }
}

export default LoginPage;
