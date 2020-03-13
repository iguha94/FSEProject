import React, { Component } from 'react';
import { Panel, Form, FormGroup, FormControl, Button } from 'react-bootstrap';

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

    handleFormSubmit(e) {
        e.preventDefault();

        console.log("FORM SUBMIT!");

    }
    render() {
        return (
            <div style={divStyle}>
                <Panel style={panelStyle}>
                    <Form horizontal className="RegistrationForm" id="registrationForm">
                        <FormGroup controlId="formEmail">
                            <FormControl type="email" placeholder="Email Address" />
                        </FormGroup>
                        <FormGroup controlId="formPassword">
                            <FormControl type="password" placeholder="Password" />
                        </FormGroup>
                         <FormGroup controlId="formFirstName">
                            <FormControl type="firstName" placeholder="FirstName" />
                        </FormGroup>
                        <FormGroup controlId="formLastName">
                            <FormControl type="lastName" placeholder="LastName" />
                        </FormGroup>
                        <FormGroup controlId="formStreet">
                            <FormControl type="street" placeholder="Street" />
                        </FormGroup>
                        <FormGroup controlId="formCity">
                            <FormControl type="city" placeholder="City" />
                        </FormGroup>
                        <FormGroup controlId="formState">
                            <FormControl type="state" placeholder="State" />
                        </FormGroup>
                        <FormGroup controlId="formZip">
                            <FormControl type="zip" placeholder="Zip" />
                        </FormGroup>
                        <FormGroup controlId="formCountry">
                            <FormControl type="country" placeholder="Country" />
                        </FormGroup>
                        <FormGroup controlId="formPhone">
                            <FormControl type="phone" placeholder="Phone" />
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
