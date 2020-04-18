import React, { Component } from 'react';
import { Panel, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

const Url='http://localhost:5000/'

class QueryPage extends Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            validated: false,
            email: '',
            firstName: ''
        };
        console.log('In query page')
        this.SearchAllEvents = this.SearchAllEvents.bind(this);
    }

    SearchAllEvents(e){

    }
     render(){
         return(<div>
            Under Construction!
         </div>
         )
     }

}

export default QueryPage