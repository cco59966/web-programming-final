"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import connectMongoDB from ".././config/mongodb";
import ".././css/VRPage.css";
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';


const HeadsetItem = ({ id, name, image }: { id: number; name: string; image: string }) => {

  const handleReturn = async () => {
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          type: "return",
          data: {
            headsetId: id,
          },
        }),
      });

      const result = await res.json();

      if (res.ok) {
        console.log("Headset returned:", result);
        window.location.reload(); 
      } else {
        console.error("Failed to return headset:", result.error);
      }
    } catch (error) {
      console.error("Error returning headset:", error);
    }
  };

  return (
    <div className="w-full mb-8">
      <div className="flex bg-white shadow-md rounded-xl p-6 h-[200px]">
        <div className="flex-1 flex justify-center items-center">
          <Image src={image} alt={name} width={200} height={150} priority />
        </div>

        <div className="flex-1 flex flex-col justify-center pl-4">
          <h3 className="text-xl font-semibold text-gray-800">Headset Meta Quest {id}</h3>
          <p className="text-gray-600">{name}</p>
        </div>

        <div className="flex-1 flex items-center justify-end">
          <button
            onClick={handleReturn}
            className="bg-black text-white px-4 py-2 rounded font-semibold"
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [headsets, setHeadsets] = useState([]);
  const [userId, setUserId] = useState<string | null>(null);

    const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      localStorage.removeItem("user");
    
  
      fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
    
   
      router.push("/signup");
    };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          console.warn("No user found in localStorage");
          return;
        }
        const parsedUser = JSON.parse(storedUser);
        const extractedUserId = parsedUser._id;
        
        setUserId(extractedUserId);

        // Now fetch headsets
        const res = await fetch("/api/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "getCheckedOut",
            data: {
              userId: extractedUserId,
            },
          }),
        });

        const json = await res.json();
        setHeadsets(json.headsets || []);
      } catch (err) {
        console.error("Failed to fetch user/headsets:", err);
      }
    };

    fetchData();
  }, []);

  connectMongoDB();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#BA0C2F] text-black flex justify-between items-center px-8 py-6">
        <div className="flex items-center justify-start">
          <h1 className="text-3xl font-bold text-left">Warnell VR Checkout System</h1>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => router.push("http://localhost:3000/message")}
            className="bg-black text-white px-4 py-2 rounded font-semibold"
          >
            Messages
          </button>
          <button 
            onClick={() => router.push("home")}
            className="bg-black text-white px-4 py-2 rounded font-semibold"
          >
            Return Home
          </button>
          <button 
            onClick={() => router.push("checkout")}
            className="bg-black text-white px-4 py-2 rounded font-semibold"
          >
            Add Items
          </button>
          <form onSubmit={handleLogout}>
            <button className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-gray-800 transition">
              Logout
            </button>
            </form>
        </div>
      </header>

      <div className="vr-container2">
        <div className="overflow-y-auto h-[600px] pr-4">
          {headsets.map((headset: any) => (
            <HeadsetItem
              key={headset._id}
              id={headset.id}
              name={`Return by ${new Date(headset.returnBy).toLocaleDateString()}`}
              image="https://90a1c75758623581b3f8-5c119c3de181c9857fcb2784776b17ef.ssl.cf2.rackcdn.com/640021_305565_02_front_comping.jpg"
            />
          ))}
        </div>
      </div>

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
          <span className="text-base flex-1 text-center">© University of Georgia</span>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <a href="https://eits.uga.edu/resources/" className="hover:underline">
            Resources
          </a>
          <a href="https://warnell.uga.edu/resources-students" className="hover:underline">
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
    </div>
  );
}