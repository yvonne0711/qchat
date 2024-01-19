// HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./HomePage.css";

const HomePage = () => {
  // Initialize AOS after the component is mounted
  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="home-container" data-aos="fade-up">
      <h2>Welcome to Q-Chat</h2>
      <p>
        Q-Chat is your go-to platform for seamless communication. Join us now to
        connect with others!
      </p>
      <div className="cta-buttons">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

