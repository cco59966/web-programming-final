"use client"

import { useState } from "react";
import connectMongoDB from ".././config/mongodb";
import '.././css/VRPage.css';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { set } from "mongoose";

export default function Home() {
  // State for login toggle
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoggedIn(true); // Set login state to true // CHANGE THIS FOR THE END OF THE PROJECT
    // Handle form submission logic here
    console.log('Form submitted');

    router.push('authenticated'); // ✅ Redirect to desired page

  };
  const handleSubmit2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');

    router.push('authenticated'); // ✅ Redirect to desired page

  };
  const handleSubmit3 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');

    router.push('home'); // ✅ Redirect to desired page

  };
  connectMongoDB();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/items/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
        credentials: "include",
      });


      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/checkout");
      }
      else {
        setError(data.message || "Login failed");
      }
    } catch (error) {


      console.error("Login error:", error);
      setError("An unexpected error occurred.");
    }
  };

  const handleReturnHome = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="relative min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/images/vrpage/vr.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <main className="flex-1">
        <div className="vr-login-form">
          <form onSubmit={handleLoginSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Login</button>
            {error && <p className="text-red-600">{error}</p>}
          </form>
        </div>

        <header className="bg-[#BA0C2F] text-black flex justify-between items-center px-8 py-6">
          <div className="flex items-center justify-start">
            <h1 className="text-3xl font-bold text-left">Warnell VR Checkout System</h1>
          </div>
          <form onSubmit={handleReturnHome}>
            <button className="bg-black text-white px-4 py-2 rounded font-semibold">
              Return Home
            </button>
          </form>
        </header>
      </main>

      <footer className="bg-black text-white p-0.5 flex flex-col sm:flex-row justify-between items-center">
        {/* Left side: UGA Logo + © text */}
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="relative w-40 h-20">
            <Image
              src="https://bitbucket.org/ugamc/uga-global-footer/raw/e0c8a5d1e7e8950a9c2f767c7e941f5b2e5c70ae/src/_assets/img/GEORGIA-FS-CW.svg"
              alt="UGA Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-base">© University of Georgia</span>
        </div>

        {/* Right side: Links */}
        <div className="flex flex-col items-center space-y-2">
          <a href="https://eits.uga.edu/resources/" className="hover:underline">Resources</a>
          <a href="https://warnell.uga.edu/resources-students" className="hover:underline">Contact Warnell IT</a>
          <a href="https://my.uga.edu/htmlportal/index.php?guest=normal/render.uP" className="hover:underline">MyUGA</a>
          <a href="https://eits.uga.edu/support/" className="hover:underline">Help</a>
        </div>
      </footer>
    </div>
    //</div>
  );
}

