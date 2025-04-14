"use client"

import { useState } from "react";
import connectMongoDB from ".././config/mongodb";
import '.././css/VRPage.css';
import Image from "next/image";
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
   
      router.push('/login'); // ✅ Redirect to desired page
    
  };
  const handleSubmit2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
   
      router.push('checkout'); // ✅ Redirect to desired page
    
  };
  const handleSubmit3 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
   
      router.push('/'); // ✅ Redirect to desired page
    
  };
  connectMongoDB();


  return (

      <div className="min-h-screen flex flex-col">
      {/* HEADER (Red Bar) */}
      <header className="bg-[#b20000] text-black flex justify-between items-center px-8 py-6">
        <div className = "flex items-center justify-start">
        {/* Button with Triangle */}
      <button className="bg-black text-white p-2 rounded mr-4 flex items-center justify-center">
        <svg 
          className="w-4 h-4" 
          viewBox="0 0 20 20" 
          fill="currentColor" 
          aria-hidden="true"
      >
          {/* Example triangle polygon (pointing right) */}
          <polygon points="5,3 15,10 5,17" />
        </svg>
      </button>
        <h1 className="text-3xl font-bold text-left">Warnell VR Checkout System</h1>
        </div>
        <form onSubmit={handleSubmit3}>
        <button
         
         className="bg-black text-white px-4 py-2 rounded font-semibold"
       >
        Return Home
       </button>
       </form>
        <form onSubmit={handleSubmit2}>
        <button
         
         className="bg-black text-white px-4 py-2 rounded font-semibold"
       >
        Add Items
       </button>
       </form>
       <form onSubmit={handleSubmit}>
        <button
         
          className="bg-black text-white px-4 py-2 rounded font-semibold"
        >
         Logout
        </button>
        </form>
      </header>
      
      <div className="vr-container">
        
  
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
  
        <img src="uga.png" alt="UGA Logo" className="vr-logo" />
      </div>
    </div>
  );
}

