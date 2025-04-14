"use client"

import { useState } from "react";
import Image from "./images";
import connectMongoDB from "./config/mongodb";
import './css/VRPage.css';

export default function Home() {
  // State for login toggle
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  connectMongoDB();


  return (
    <div className="vr-container">
      <header className="vr-header"></header>

      <div className="vr-title">Warnell VR Checkout System</div>

      <div className="vr-login-form">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name" 
            placeholder="Enter your name" 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Enter your email" 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Enter your password" 
            required 
          />
          <button type="submit">Login</button>
        </form>
      </div>

      <footer className="vr-footer">
        <div className="vr-links-column">
          <a href="https://eits.uga.edu/resources/" target="_blank" rel="noopener noreferrer">
            Resources
          </a>
          <a href="https://warnell.uga.edu/resources-students" target="_blank" rel="noopener noreferrer">
            Contact Warnell IT
          </a>
          <a href="https://my.uga.edu/htmlportal/index.php?guest=normal/render.uP" target="_blank" rel="noopener noreferrer">
            MYUGA
          </a>
          <a href="https://eits.uga.edu/support/" target="_blank" rel="noopener noreferrer">
            Help
          </a>
        </div>
        <div className="vr-copyright">
          © University of Georgia.
        </div>
      </footer>

      <img src="./images/uga.png" alt="UGA Logo" className="vr-logo" />
    </div>
  );
}

