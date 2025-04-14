"use client"

import { useState } from "react";
import connectMongoDB from ".././config/mongodb";
import '.././css/VRPage.css';
import { useRouter } from 'next/navigation';
import Image from "next/image";

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
   
      router.push('/authenticated'); // ✅ Redirect to desired page
    
  };

  connectMongoDB();


  return (
    <div className="min-h-screen flex flex-col vr-container">
      <header className="vr-header"></header>
      <main className = "flex-1">
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
      </main>

      {/* FOOTER (Black Bar) */}
      <footer className="bg-black text-white p-0.5 flex flex-col sm:flex-row justify-between items-center">
        {/* Left: UGA Logo & Text */}
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="relative w-40 h-20">
            <Image
              //src="/uga-logo.png"        // in /public/uga-logo.png
              src = "https://bitbucket.org/ugamc/uga-global-footer/raw/e0c8a5d1e7e8950a9c2f767c7e941f5b2e5c70ae/src/_assets/img/GEORGIA-FS-CW.svg"
              alt="UGA Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-base">© University of Georgia</span>
        </div>

        {/* Right: Footer Links */}
        <div className="flex flex-col items-center space-y-2">
          <a href="https://eits.uga.edu/resources/" className="hover:underline">Resources</a>
          <a href="https://warnell.uga.edu/resources-students" className="hover:underline">Contact Warnell IT</a>
          <a href="https://my.uga.edu/htmlportal/index.php?guest=normal/render.uP" className="hover:underline">MyUGA</a>
          <a href="https://eits.uga.enpdu/support/" className="hover:underline">Help</a>
        </div>
      </footer>

    </div>
  );
}

