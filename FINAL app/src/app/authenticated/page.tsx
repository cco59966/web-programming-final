"use client"

import { useState } from "react";
import connectMongoDB from ".././config/mongodb";
import '.././css/VRPage.css';
import { useRouter } from 'next/navigation';

export default function Home() {
  // State for login toggle
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
   
      router.push('/authenticated.tsx'); // ✅ Redirect to desired page
    
  };

  connectMongoDB();


  return (
    <div className="vr-container">
      <header className="vr-header"></header>

      <div className="vr-title">Your Headsets</div>

      

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

