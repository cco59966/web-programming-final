"use client";

import { useState } from "react";
import Image from "next/image";
import connectMongoDB from "./config/mongodb";

export default function Home() {
  // State for login toggle
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // Connect to the database (if required for your page).
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
        <button
          onClick={handleLogin}
          className="bg-black text-white px-4 py-2 rounded font-semibold"
        >
          {isLoggedIn ? "Log Out" : "Login"}
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-white text-black px-8 py-10 flex flex-col gap-8 sm:flex-row sm:px-20 sm:py-20">
        {/* LEFT COLUMN: Text */}
        <div className="flex-1 flex flex-col justify-center gap-4">
          <p className="text-lg">
            Login using your UGA email to access our VR Headset checkout system 
            for labs and projects.
          </p>
          <p className="text-lg">
            If you have any questions regarding technology, please visit the 
            Warnell IT office located in building 4, room 424.
          </p>
        </div>

        {/* RIGHT COLUMN: VR Headset & Building Images */}
        <div className="flex flex-row items-center gap-4">
          {/* VR Headset Image */}
          <div className="w-full max-w-sm">
            <Image
              src="/vr-headset.png"           // in /public/headset.png
              alt="VR Headset"
              width={300}
              height={200}
              className="object-contain"
              priority
            />
          </div>
          {/* Building Image */}
          <div className="w-full max-w-sm">
            <Image
              src="/uga-building.png"  // in /public/warnell-building.jpg
              alt="Warnell Building"
              width={300}
              height={200}
              className="object-cover rounded"
            />
          </div>
        </div>
      </main>

      {/* FOOTER (Black Bar) */}
      <footer className="bg-black text-white p-4 flex flex-col sm:flex-row justify-between items-center">
        {/* Left: UGA Logo & Text */}
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="relative w-40 h-40">
            <Image
              src="/uga-logo.png"        // in /public/uga-logo.png
              alt="UGA Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-base">© University of Georgia</span>
        </div>

        {/* Right: Footer Links */}
        <div className="flex flex-col items-center space-y-2">
          <a href="#" className="hover:underline">Resources</a>
          <a href="#" className="hover:underline">Contact Warnell IT</a>
          <a href="#" className="hover:underline">MyUGA</a>
          <a href="#" className="hover:underline">Help</a>
        </div>
      </footer>
    </div>
  );
}

