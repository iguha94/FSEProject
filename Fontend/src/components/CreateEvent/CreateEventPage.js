import React, { Component } from 'react';
import CreateEventForm from './CreateEventForm';

import './CreateEvent.css';
import NavBar from "../NavBar/NavBar";

class CreateEventPage extends Component {

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
            <div className="CreateEventPage">
                <NavBar className="Nav-Bar"/>
                <h2 className = "title">Request Disaster Resources</h2>
                <CreateEventForm reRoute={this.reRoute} className="Event-body"/>
            </div>
        );
    }
}

export default CreateEventPage;