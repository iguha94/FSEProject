import React, { Component } from 'react';
import { Panel, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

const Url='http://localhost:5000/'

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
    alignItems: 'center',
};

const buttonStyle = {
    marginBottom: 0
};

class RegistrationForm extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
          validated: false,
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          street: '',
          city: '',
          states: '',
          zip: '',
          country: '',
          phone: ''
        };
    
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlefirstNameChange = this.handlefirstNameChange.bind(this);
        this.handlelastNameChange = this.handlelastNameChange.bind(this);
        this.handlestreetChange = this.handlestreetChange.bind(this);
        this.handlecityChange = this.handlecityChange.bind(this);
        this.handlestateChange = this.handlestateChange.bind(this);
        this.handlezipChange = this.handlezipChange.bind(this);
        this.handlecountryChange = this.handlecountryChange.bind(this);
        this.handlephoneChange = this.handlephoneChange.bind(this);
      }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handlefirstNameChange(e){
        this.setState({firstName: e.target.value});
    }

    handlelastNameChange(e){
        this.setState({lastName: e.target.value});
    }

    handlestreetChange(e){
        this.setState({street: e.target.value});
    }

    handlecityChange(e){
        this.setState({city: e.target.value});
    }

    handlestateChange(e){
        console.log(e.target.value)
        this.setState({states: e.target.value});
    }

    handlezipChange(e){
        this.setState({zip: e.target.value});
    }

    handlecountryChange(e){
        this.setState({country: e.target.value});
    }

    handlephoneChange(e){
        this.setState({phone: e.target.value});
    }

    handleFormSubmit(e) {
        e.preventDefault();
        console.log('In handle submit')
         const regurl=Url+'registration'
         console.log('Email Id: '+this.state.email)
   
       const payload = {
       Email: this.state.email,
       PassWord: this.state.password,
       LastName: this.state.lastName,
       FirstName: this.state.firstName,
       Street: this.state.street,
       City: this.state.city,
       ZIP: this.state.zip,
       State: this.state.states,
       Country: this.state.country,
       Phone: this.state.phone
       }
       console.log(payload)
       axios({method:'post',
             url: regurl,
             data:{
               payload
       }
     }).then(data => {
       console.log(data);
       console.log("FORM SUBMITTED!");
       this.props.reRoute('/');
     }).catch(err=>console.log(err));

    }
    render() {
        return (
            <div style={divStyle}>
                <Panel style={panelStyle}>
                    <Form horizontal className="RegistrationForm" id="registrationForm">
                        <FormGroup controlId="formEmail">
                            <FormControl type="email" value={this.state.email} onChange={this.handleEmailChange} placeholder="Email Address" />
                        </FormGroup>
                        <FormGroup controlId="formPassword">
                            <FormControl type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" />
                        </FormGroup>
                         <FormGroup controlId="formFirstName">
                            <FormControl type="firstName" value={this.state.firstName} onChange={this.handlefirstNameChange} placeholder="FirstName" />
                        </FormGroup>
                        <FormGroup controlId="formLastName">
                            <FormControl type="lastName" value={this.state.lastName} onChange={this.handlelastNameChange} placeholder="LastName" />
                        </FormGroup>
                        <FormGroup controlId="formStreet">
                            <FormControl type="street" value={this.state.street} onChange={this.handlestreetChange} placeholder="Street" />
                        </FormGroup>
                        <FormGroup controlId="formCity">
                            <FormControl type="city" value={this.state.city} onChange={this.handlecityChange} placeholder="City" />
                        </FormGroup>
                        <FormGroup controlId="formState">
                            <FormControl type="state" value={this.state.states} onChange={this.handlestateChange} placeholder="State" />
                        </FormGroup>
                        <FormGroup controlId="formZip">
                            <FormControl type="zip" value={this.state.zip} onChange={this.handlezipChange} placeholder="Zip" />
                        </FormGroup>
                        <FormGroup controlId="formCountry">
                            <FormControl type="country" value={this.state.country} onChange={this.handlecountryChange} placeholder="Country" />
                        </FormGroup>
                        <FormGroup controlId="formPhone">
                            <FormControl type="phone" value={this.state.phone} onChange={this.handlephoneChange} placeholder="Phone" />
                        </FormGroup>
                        <FormGroup style={buttonStyle} controlId="formSubmit">
                            <Button bsStyle="primary" type="submit" onClick={this.handleFormSubmit}>
                                Submit
                            </Button>
                        </FormGroup>
                    </Form>
                </Panel>
            </div>
        );
    }
}

export default RegistrationForm;
