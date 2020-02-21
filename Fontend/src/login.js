import React from 'react';
import {Router, Route, Link} from "react-router";
import logo from './logo.svg';
// import 'App.css';
import {signup} from './Sign_up';

require('./login.css');


function login() {
    return (
        <div className="App">
            <header className="App-header">
                <p id="image_logo"><img src={logo} className="App-logo" alt="logo"/></p>
                <form method="post">
                    <p><label className="label_input">username </label><label htmlFor="username"></label><input
                        type="text" id="username" className="text_field"/></p>
                    <p><label className="label_input">password </label><label htmlFor="password"></label><input
                        type="password" id="password" className="text_field"/></p>
                    <div id="login_control">
                        <input type="button" id="btn_login" value="login"/>
                        <p><a id="Sign_up" onClick={() => {
                            signup(() => {
                                this.props.history.push("/Sign_up");
                            });
                        }}>Sign up</a>
                            <a id="forget_pwd" path="forget_pwd.html">forget password?</a></p>
                    </div>
                </form>
            </header>
        </div>
    );
}

export default login;