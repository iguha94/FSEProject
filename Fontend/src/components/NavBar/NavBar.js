import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Form, FormControl, Button } from 'react-bootstrap';
import './NavBar.css';
import Container from "reactstrap/lib/Container";


class NavBar extends Component {
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
                            <a className="nav-item"><a href="/login">Login</a></a>
                            <a className="nav-item"><a href="/registration">Sign Up</a></a>
                        </Form>
                    </Container>
                </Nav>
            </Navbar>
        );
    }
}

export default NavBar