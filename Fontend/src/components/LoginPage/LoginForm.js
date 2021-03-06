import React, { Component } from 'react';
import { Panel, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Url='http://localhost:5000/'
const history = useHistory;

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  // marginTop: '20%'
};

const panelStyle = {
  // backgroundColor: 'rgba(255,255,255,0.5)',
  border: 0,
  //paddingLeft: 20,
  //paddingRight: 20,
};

const buttonStyle = {
  marginBottom: 0
};

class LoginForm extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      validated: false,
      email: '',
      password: '',
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange(e) {
   this.setState({email: e.target.value});
  }
  handlePasswordChange(e) {
   this.setState({password: e.target.value});
  }
  handleFormSubmit(e) {
    e.preventDefault();
    console.log('In handle submit')
    const loginurl=Url+'login'
    console.log('Email Id: '+this.state.email)

    const payload = {
	Email:this.state.email,
	PassWord: this.state.password
    }
    axios({method:'post',
          url: loginurl,
          data:{
            payload
    }
  }).then(data => {
    localStorage.setItem('userToken', data.data.token);
    console.log(localStorage.getItem('userToken'));
    alert("Sucessfully Logged In!");
    window.location.href = '/';
  }).catch(err=>console.log(err));
  }

  render() {
    return (
      <div style={divStyle}>
        <Panel style={panelStyle}>
          <Form horizontal className="LoginForm" id="loginForm">
            <FormGroup controlId="formEmail">
              <FormControl type="email" value={this.state.email} onChange={this.handleEmailChange} placeholder="Email Address" />
            </FormGroup>
            <FormGroup controlId="formPassword">
              <FormControl type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" />
            </FormGroup>
            <FormGroup style={buttonStyle} controlId="formSubmit">
              <Button bsStyle="primary" type="submit" onClick={this.handleFormSubmit}>
                Login
              </Button>
            </FormGroup>
          </Form>
        </Panel>
      </div>
    )
  }
}

export default LoginForm;