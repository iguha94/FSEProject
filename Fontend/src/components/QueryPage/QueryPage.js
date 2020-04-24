import React, { Component } from 'react';
import {ListGroup } from 'react-bootstrap';
import axios from 'axios';
import './QueryPage.css';
import NavBar from "../NavBar/NavBar";

const Url='http://localhost:5000/'

class QueryPage extends Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            validated: false,
            Events:[]
        };
        console.log('In query page')
    }
    componentDidMount() {
        const loginurl=Url+'query'
        axios.get(loginurl).then(data => {
            this.setState({Events: data['data']['Events']});
        }).catch(err=>console.log(err));
    }

    render(){
        return(
            <div> 
                <header className="Reg-header">
                    <NavBar className="Nav-Bar"/>
                </header>
               
            <table className="Event-Table">
            {
                    this.state.Events.length > 0 ?
                    this.state.Events.map((item,index) => {
                    return(
                        
                            <tr>   
                                <div>
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="card-text"> {item.Title} </p>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-muted"><b>Created At :</b> {item.CreatedAt}</small>
                                        &nbsp;<small className="text-muted"><b>Created By :</b> {item.Email}</small>
                                        &nbsp;<small className="text-muted"><b>Location :</b> {item.Street}, {item.City}, {item.State}, {item.ZIP}, {item.Country}</small>

                                    </div>
                                </div>
                            </tr> 
                        
                        );
                    }):
                []
            } 
            </table>     
               
        </div>
        );
     }

}

export default QueryPage
