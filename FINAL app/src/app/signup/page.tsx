"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Handles the change of the forms, just like the /login does

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles the submit for the signup page
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/items/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", 
      });
    
      const result = await res.json();
       
      if (!res.ok) {
        setError(result.message || "Signup failed");
      } else {
     // Sends the user feedback saying they signed up successfully
        setSuccessMessage(`Sign up confirmed!!! Welcome ${formData.name}!!!`);
        if (res.ok) {

          // Clear the storage of the old data just in case and push the user to checkout
          localStorage.clear()
          localStorage.setItem("user", JSON.stringify(result.user)); 
          router.push("/checkout");
        }

      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };


  // Header buttons
  const handleReturnHome = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/");
  };

  const handleNavigateLogin = () => {
    router.push("/login");
  };

  return (

    
    <div 
    className="min-h-screen flex flex-col"
    style={{
      
      backgroundImage: "url('/images/vrpage/vr.jpg')",
      backgroundSize:   "cover",
      backgroundPosition:"center",
      backgroundRepeat:  "no-repeat",
    }}
    >
      
      {/* SIgnup form */}
      <main className="flex-1">
        <div className="vr-login-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
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
            <button type="submit">Sign Up</button>
            {error && <p className="text-red-600 mt-2">{error}</p>}
            {successMessage && <p className="text-green-600 mt-2 font-semibold">{successMessage}</p>}
            <p className="mt-2 text-sm">
              Already have an account?{' '}
              
      {/* Gives the user an option for a login button */}
              <button type="button" onClick={handleNavigateLogin} className="text-blue-600 underline">
                Log in here
              </button>
            </p>
          </form>
        </div>


      {/* Universal header */}
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

      {/* Universal footer */}
      <footer className="bg-black text-white p-0.5 flex flex-col sm:flex-row justify-between items-center">
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
