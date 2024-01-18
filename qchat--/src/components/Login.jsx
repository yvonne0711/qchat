import React from "react";
import { GoogleOutlined, FacebookOutlined} from '@ant-design/icons';

import {Link} from "react-router-dom";
import 'animate.css';

import "firebase/app";
import {auth} from './firebase';
// import Firebase from 'firebase/app';

const Login = () => {
    
return(
    <div id="Login_page">
       
        <div id="Login_card" className="animate__animated animate__fadeInDown">
        <h2>Welcome To Qchat</h2>
            {/* <div className="registration-container" data-aos="fade-up">

            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

                <label>Set Your Quassword:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                </div> */}
          <div className="btns_row">
          <div className="login_btn google_btn"
          onClick={() => auth.signInWithRedirect(new Firebase.auth.GoogleOutlined())}>
                <GoogleOutlined/> Sign in with Google
            </div>
            <div 
            className="login_btn facebook_btn"
            onClick={() => auth.signInWithRedirect(new Firebase.auth.FacebookOutlined())}>
                <FacebookOutlined/> Sign in with Facebook
            </div>
          </div>
          <p>New User! <span><Link to="/registration">Sign Up</Link></span></p>
        </div>
    </div>






);

}

export default Login;