"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import connectMongoDB from ".././config/mongodb";
import ".././css/VRPage.css";
import { useRouter } from "next/navigation";


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

  useEffect(() => {
    const fetchCheckedOutHeadsets = async () => {
      try {
        const res = await fetch("/api/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "getCheckedOut",
            data: {
              userId: "67f68c137a5d74179328d274",
            },
          }),
        });

        const json = await res.json();
        setHeadsets(json.headsets || []);
      } catch (err) {
        console.error("Failed to fetch headsets", err);
      }
    };

    fetchCheckedOutHeadsets();
  }, []);

  connectMongoDB(); // Optional — not required on client side unless you're forcing DB logic for dev

  // ✅ Single return statement below
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#BA0C2F] text-black flex justify-between items-center px-8 py-6">
        <div className="flex items-center justify-start">
          <h1 className="text-3xl font-bold text-left">Warnell VR Checkout System</h1>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push("home");
          }}
        >
          <button className="bg-black text-white px-4 py-2 rounded font-semibold">
            Return Home
          </button>
        </form>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push("checkout");
          }}
        >
          <button className="bg-black text-white px-4 py-2 rounded font-semibold">
            Add Items
          </button>
        </form>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/login");
          }}
        >
          <button className="bg-black text-white px-4 py-2 rounded font-semibold">
            Logout
          </button>
        </form>
      </header>

      <div className="vr-container2">
        <div className="overflow-y-auto h-[600px] pr-4">
          {headsets.map((headset: any) => (
            <HeadsetItem
              key={headset._id}
              id={headset.id}
              name={`Return by ${new Date(headset.returnBy).toLocaleDateString()}`}
              image="https://90a1c75758623581b3f8-5c119c3de181c9857fcb2784776b17ef.ssl.cf2.rackcdn.com/640021_305565_02_front_comping.jpg" // shortened for readability
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
          <span className="text-base">© University of Georgia</span>
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