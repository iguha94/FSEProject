import React from 'react';
import logo from '../src/logo.svg';

require('../src/login.css');


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
                        <p><a id="Sign_up" onClick={jump}>Sign up</a>
                            <a id="forget_pwd" path="forget_pwd.html">forget password?</a></p>
                    </div>
                </form>
            </header>
        </div>
    );
}
const jump = () => {
    // window.location.href = "signup.html";
    return(
        <div className="signup">
            <header className="nothing">
                <p><label>Please set your user name and password</label></p>
                <p><label className="label_input">username </label><label htmlFor="username"></label><input
                    type="text" id="username" className="text_field"/></p>
                <p><label className="label_input">password </label><label htmlFor="password"></label><input
                    type="password" id="password" className="text_field"/></p>
            </header>
        </div>
    );

}
export default login;
