// HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./HomePage.css";
import logo from "../assets/logo.png"; // Import logo image
import lady from "../assets/lady.png"; // Import lady image
import mainLogo from "../assets/homePage_logo.png"
const HomePage = () => {
  // Initialize AOS after the component is mounted
  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="home-container" data-aos="fade-down">
    
      {/* <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div> */}

     
      <div className="content-container" >
        {/* <h1>Welcome to Q-Chat</h1> */}
        <img src={mainLogo} alt="Logo" className="Homelogo" />
        <p>
          Q-Chat is your go-to platform for seamless communication. Join us now
          to connect with others!
        </p>
        <div className="cta-buttons">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/registration">
            <button>Register</button>
          </Link>
          
        </div>
      </div>
      {/* <div className="lady-container">
        <img src={lady} alt="Lady" className="lady" />
      </div> */}
     
    </div>
  );
};

export default HomePage;
