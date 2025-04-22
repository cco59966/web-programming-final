"use client";

import Image from "next/image";
import connectMongoDB from "./config/mongodb";
import "./css/VRPage.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 // setIsLoggedIn(false); 
  // --- IMAGES FOR EACH COLUMN ---
  const col1 = ["/images/vrpage/forest1.jpg", "/images/vrpage/forest4.jpg", "/images/vrpage/forest7.jpg"];
  const col2 = ["/images/vrpage/forest2.jpg", "/images/vrpage/forest5.jpg", "/images/vrpage/forest8.jpg","/images/vrpage/forest15.jpg"];
  const col3 = ["/images/vrpage/forest3.jpg", "/images/vrpage/forest6.jpg", "/images/vrpage/forest11.jpg"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/signup");
  };
  const handleSubmit2 = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("authenticated");
  };
  const handleSubmit3 = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };
  const handleSubmit4 = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/message");
  };
  connectMongoDB();

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* BACKGROUND: 3‑column infinite scroll */}
      <div className="absolute inset-0 -z-10 grid grid-cols-[1fr_3fr_1fr] gap-4 p-8" aria-hidden="true">
        {[col1, col2, col3].map((col, idx) => {
          const imgs = [...col, ...col];
          return (
            <div key={idx} className="col-mask rounded">
              <div className={`col-content scroll-col-${idx + 1}`}>  
                {imgs.map((src, i) => (
                  <div key={i} className="relative w-full h-80">
                    <Image src={src} alt={`forest-${idx}-${i}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <header className="relative z-10 bg-[#BA0C2F] text-black flex justify-between items-center px-8 py-6">
        <h1 className="text-3xl font-bold">Warnell VR Checkout System</h1>
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/message")}
            className="bg-black text-white px-4 py-2 rounded font-semibold"
          >
            Messages
          </button>
          {isLoggedIn && (
            <button
              onClick={() => router.push("/checkout")}
              className="bg-black text-white px-4 py-2 rounded font-semibold"
            >
              Add Items
            </button>
          )}
          {isLoggedIn && (
            <button
              onClick={() => router.push("/authenticated")}
              className="bg-black text-white px-4 py-2 rounded font-semibold"
            >
              View Reservations
            </button>
          )}
     
          {!isLoggedIn && (
          <button
          onClick={() => router.push("/signup")}
          className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-gray-800 transition"
        >
          Sign Up Or Log In
        </button>
          )}
        </div>
      </header>

      {/* MAIN CONTENT (transparent so background shows) */}
      <main className="relative z-10 flex-1 text-black px-8 py-10 flex flex-col gap-8 sm:flex-row sm:px-20 sm:py-20">
        {/* BOX AROUND LEFT TEXT */}
        <div className="solid-box flex-1 flex flex-col justify-center gap-4">
          <p className="text-lg">
            Login using your UGA email to access our VR Headset checkout system for labs and projects.
          </p>
          <p className="text-lg">
            If you have any questions regarding technology, please visit the Warnell IT office located in building 4, room 424.
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 bg-black text-white p-0.5 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="relative w-40 h-20">
            <Image src="https://bitbucket.org/ugamc/uga-global-footer/raw/e0c8a5d1e7e8950a9c2f767c7e941f5b2e5c70ae/src/_assets/img/GEORGIA-FS-CW.svg" alt="UGA Logo" fill className="object-contain" />
          </div>
          <span className="text-base">© University of Georgia</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <a href="https://eits.uga.edu/resources/" className="hover:underline">Resources</a>
          <a href="https://warnell.uga.edu/resources-students" className="hover:underline">Contact Warnell IT</a>
          <a href="https://my.uga.edu/htmlportal/index.php?guest=normal/render.uP" className="hover:underline">MyUGA</a>
          <a href="https://eits.uga.edu/support/" className="hover:underline">Help</a>
        </div>
      </footer>
    </div>
  );
}