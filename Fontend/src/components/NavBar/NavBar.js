import React, { Component } from 'react';
import { Navbar, Nav, Form, NavDropdown } from 'react-bootstrap';
import './NavBar.css';
import Container from "reactstrap/lib/Container";


class NavBar extends Component {
    constructor() {
        super();
    }

    logout(e){
        e.preventDefault();
        localStorage.removeItem('userToken');
        alert("Successfully Logged Out!");
        //this.props.history.push('/')
    }
    render() {
        return (
            <Navbar>
                <Nav className="navbar navbar-inverse">
                    <Container className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">Crisis Donation Hub</a>
                        </div>
                        <Form inline>
                            <a className="nav-item"><a href="/">Home</a></a>
                            <a className="nav-item"><a href="/query">Events</a></a>
                            <a className="nav-item"><a href="/event">Request</a></a>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    User
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/login">Login</a>
                                    <a className="dropdown-item" href="/registration">Sign Up</a>
                                    <a className="dropdown-item" href="/" onClick={this.logout}>Logout</a>
                                </div>
                                  </li>
                        </Form>
                    </Container>
                </Nav>
            </Navbar>
        );
    }
}

export default NavBar