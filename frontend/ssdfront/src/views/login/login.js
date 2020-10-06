import React, { Component } from 'react';
import axios from 'axios';

import Config from "../../config";

import "./login.css";

class Login extends Component {

    async handleLogin() {
        await axios
            .get(
                `${Config.host}${Config.port}${Config.api.loginWithGoogle}`
            )
            .then((Response) => {
                console.log(Response);
                console.log(Response.data);
                window.location.href = Response.data;            
            })
            .catch((Error) => {
                console.error(Error);
            })
            .finally(() => {
                console.log("Login function completed");
            });
    }


    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="jumbotron text-center">
                        <h1><span className="fa fa-lock"></span>Node Google Drive Upload</h1>
                        <p>Login or Register with:</p>
                        <a className="btn btn-danger" onClick={() => this.handleLogin()}><span className="fa fa-google-plus"></span> Google</a>
                    </div>
                </div>
                <div className="waveWrapper waveAnimation">
                    <div className="waveWrapperInner bgTop">
                        <div className="wave waveTop" style={{ backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-top.png')" }}></div>
                    </div>
                    <div className="waveWrapperInner bgMiddle">
                        <div className="wave waveMiddle" style={{ backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-mid.png')" }}></div>
                    </div>
                    <div className="waveWrapperInner bgBottom">
                        <div className="wave waveBottom" style={{ backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-bot.png')" }}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;