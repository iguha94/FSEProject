import React from 'react';
import '../build/App.js';
import login from "../build/App";

var signup = React.createClass({
    render: function() {
        return (

            <div style={{textAlign: 'center'}}>
                <p><label className="label_input">Reset your password&nbsp;&nbsp;</label><label htmlFor="username" /><input type="text" id="username" className="text_field" /> </p>
                <p><label className="label_input">Retype password&nbsp;&nbsp;</label><label htmlFor="password" /><input type="password" id="password" className="text_field" /> </p>
                <input type="button" id="btn_signup" defaultValue="finish" />
            </div>
        );
    }
});