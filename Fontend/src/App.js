import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
require('./login.css');
const email = "\nEmail";
export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/Login">Login   </Link>
                    <Link to="/Signup">Signup   </Link>
                    <Link to="/Forget">Forget password </Link>
                </nav>

                <Switch>
                    <Route path="/Login">
                        <Login/>
                    </Route>
                    <Route path="/Signup">
                        <Signup />
                    </Route>
                    <Route path="/forget">
                        <Forget />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function next() {
    console.log('Signup');
}
function Login(){
    return(
        <div className="login_frame">
            <header className="App-header">
                <p id="image_logo"><img src={logo} className="App-logo" alt="logo"/></p>
                <form method="post">
                    <p><label className="label_input">{email}</label><input
                        type="text" id="email" className="text_field"/></p>
                    <p><label className="label_input">password </label><input
                        type="password" id="password" className="text_field"/></p>
                    <div id="login_control">
                        <input type="button" id="btn_login" value="login"/>
                    </div>
                </form>
            </header>
        </div>
    );
}
function Forget(){
    return(
        <div className="login_frame">
            <form method="post">
                <p><label className="label_input">username </label><input
                    type="text" id="username" className="text_field"/></p>
                <p><label className="label_input">password </label><input
                    type="password" id="password" className="text_field"/></p>
                <div id="login_control">
                    <input type="button" id="btn_login" value="login"/>
                </div>
            </form>
        </div>
    );
}

function Signup() {
    return (
        <div className="Sign_up">
            <p><label className="label_input">Email  </label><input
                type="text" id="Email" className="text_field"/></p>
            <p><label className="label_input">password  </label><input
                type="password" id="password" className="text_field"/></p>
            <p><label className="label_input">Reset password  </label><input
                type="password" id="reset_password" className="text_field"/></p>
            <p><label className="label_input">First name  </label><input
                type="text" id="first_name" className="text_field"/></p>
            <p><label className="label_input">Last name  </label><input
                type="password" id="last_name" className="text_field"/></p>
            <p><label className="label_input">Street  </label><input
                type="password" id="street" className="text_field"/></p>
            <p><label className="label_input">Zip  </label><input
                type="text" id="zip" className="text_field"/></p>
            <p><label className="label_input">city  </label><input
                type="password" id="city" className="text_field"/></p>
            <p><label className="label_input">State  </label><input
                type="password" id="state" className="text_field"/></p>
            <p><label className="label_input">Country  </label><input
                type="text" id="country" className="text_field"/></p>
            <p><label className="label_input">Phone#  </label><input
                type="password" id="phone" className="text_field"/></p>
            <p><label className="label_input">status  </label><input
                type="password" id="status" className="text_field"/></p>
            <input type="button" id="btn_signup" value="signup"/>
        </div>
    );
}

