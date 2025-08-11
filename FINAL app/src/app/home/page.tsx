"use client";
// Our home page
import { useEffect } from "react";
import Image from "next/image";
import connectMongoDB from "../config/mongodb";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Our columns for our scrolling background of images
  const col1 = [
    "/images/vrpage/forest1.jpg",
    "/images/vrpage/forest4.jpg",
    "/images/vrpage/forest7.jpg",
   
  ];
  const col2 = [
    "/images/vrpage/forest2.jpg",
    "/images/vrpage/forest5.jpg",
    "/images/vrpage/forest8.jpg",
    "/images/vrpage/forest9.jpg",

  ];
  const col3 = [
    "/images/vrpage/forest3.jpg",
    "/images/vrpage/forest6.jpg",
    "/images/vrpage/forest11.jpg",
    
  ];

  // See if the user is logged in right now
  useEffect(() => {
    connectMongoDB();
    const user = localStorage.getItem("user"); 
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  
  

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.removeItem("user");
    fetch("/api/logout", { method: "POST", credentials: "include" });
    router.push("/signup");
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Create the background, pretty cool*/}
      <div
        className="absolute inset-0 z-0 grid grid-cols-[1fr_3fr_1fr] gap-4 p-8 pointer-events-none"
        aria-hidden="true"
      >
        {[col1, col2, col3].map((col, idx) => {
          const imgs = [...col, ...col];
          return (
            <div key={idx} className="col-mask rounded">
              <div className={`col-content scroll-col-${idx + 1}`}>
                {imgs.map((src, i) => (
                  <div key={i} className="relative w-full h-80">
                    <Image src={src} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Universal header */}
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

          
      {/* Some things show depending on if the user is logged in */}
           {isLoggedIn && (
<button
  onClick={handleLogout}
  className="bg-black text-white px-4 py-2 rounded font-semibold"
>
  Logout
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

      {/* Our text box */}
      <main className="relative z-10 flex-1 text-black px-8 py-10 flex flex-col gap-8 sm:flex-row sm:px-20 sm:py-20">
 
        <div className="solid-box flex-1 flex flex-col justify-center gap-4">
          <p className="text-lg">
            Navigate to your intended page using the buttons above.
          </p>
          <p className="text-lg">
            If you have any questions regarding technology, please visit the Warnell IT office located in building 4, room 424.
          </p>
        </div>
      </main>

      {/* Universal footer */}
      <footer className="relative z-10 bg-black text-white p-0.5 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="relative w-40 h-20">
            <Image
              src="https://bitbucket.org/ugamc/uga-global-footer/raw/e0c8a5d1e7e8950a9c2f767c7e941f5b2e5c70ae/src/_assets/img/GEORGIA-FS-CW.svg"
              alt="UGA Logo"
              fill
              className="object-contain"
            />
          </div>
          <span>© University of Georgia</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <a href="https://eits.uga.edu/resources/" className="hover:underline">
            Resources
          </a>
          <a
            href="https://warnell.uga.edu/resources-students"
            className="hover:underline"
          >
            Contact Warnell IT
          </a>
          <a
            href="https://my.uga.edu/htmlportal/index.php?guest=normal/render.uP"
            className="hover:underline"
          >
            MyUGA
          </a>
          <a href="https://eits.uga.edu/support/" className="hover:underline">
            Help
          </a>
        </div>
      </footer>

      {/* Inline styles for the background */}
      <style jsx global>{`
        .col-mask {
          overflow: hidden;
        }
        .col-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .scroll-col-1 {
          animation: scroll-col-1 30000ms linear infinite;
        }
        .scroll-col-2 {
          animation: scroll-col-2 45000ms linear infinite;
        }
        .scroll-col-3 {
          animation: scroll-col-3 25000ms linear infinite;
        }
        @keyframes scroll-col-1 {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-col-2 {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-col-3 {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
}
