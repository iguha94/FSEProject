import React, { Component } from 'react';
import RegistrationForm from './RegistrationForm';

import './RegistrationPage.css';

class RegistrationPage extends Component {
    render() {
        return (
            <div className="RegistrationPage">
                <RegistrationForm />
            </div>
        );
    }
}

export default RegistrationPage;