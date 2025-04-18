"use client"

// Various import statements

import { useState } from "react";
import Image from "next/image";
import connectMongoDB from ".././config/mongodb";
import '.././css/VRPage.css';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
export default function Home() {
  // State for login toggle
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const userId = localStorage.getItem("userId"); // THIS IS WHAT WE CAN USE TO GET THE USER ID LATER

  const [headsets, setHeadsets] = useState([]);
  // Handle login when we get the project going
  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // Different submit handlers for different forms (buttons)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Form submitted');
   
      router.push('/login'); // Redirect to desired page
    
  };
  const handleSubmit2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Form submitted');
   
      router.push('checkout'); // Redirect to desired page
    
  };
  const handleSubmit3 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log('Form submitted');
   
      router.push('home'); // Redirect to desired page
    
  };


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
              userId: "67f68c137a5d74179328d274", // CHANGE THIS TO userID ONCE LOGIN / LOGOUT HAS BEEN IMPLEMENTED
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
  connectMongoDB();



// Make a list of the headsets to display on the page
// looks pretty nice in my opinion, the sizing is a little off but we will fix it

const HeadsetItem = ({ id, name, image }: { id: number; name: string; image: string }) => (
    <div className="w-full mb-8">
      <div className="flex bg-white shadow-md rounded-xl p-6 h-[200px]">
        
        {/* Image Section */}
        <div className="flex-1 flex justify-center items-center">
          <Image src={image} alt={name} width={200} height={150} priority />
        </div>
  
        {/* Text Section */}
        <div className="flex-1 flex flex-col justify-center pl-4">
          <h3 className="text-xl font-semibold text-gray-800">Headset Meta Quest {id}</h3>
          <p className="text-gray-600">{name}</p>
        </div>
  
        {/* Button Section */}
        <div className="flex-1 flex items-center justify-end">
          <button className="bg-black text-white px-4 py-2 rounded font-semibold">
            Return
          </button>
        </div>
      </div>
    </div>
  );
  
  
  // Our return page to show to the user
  
return (
    <div className="min-h-screen flex flex-col">
    {/* Header across all pages */}
    <header className="bg-[#BA0C2F] text-black flex justify-between items-center px-8 py-6">
      <div className = "flex items-center justify-start">
 
      <h1 className="text-3xl font-bold text-left">Warnell VR Checkout System</h1>
      </div>

        {/* Various buttons to go through the pages*/}
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
  

   {/* This is the section that actually populates the lists with the headsets from the array*/}
    
  <div className="vr-container2">
    <div>

      
      <div className="overflow-y-auto h-[600px] pr-4">
      {headsets.map((headset: any) => (
  <HeadsetItem
    key={headset._id}
    id={headset.id}
    name={`Checked Out • Return by ${new Date(headset.returnBy).toLocaleDateString()}`}
    image="data:image/jpeg;base64,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" // Swap this with real image path if you have one
  />
))}

    </div>
    </div>
    
      {/* Footer */}
      <footer className="bg-black text-white p-0.5 flex flex-col sm:flex-row justify-between items-center">
        {/* UGA Logo and Text ( This kind of moves around a bit) */}
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="relative w-40 h-20">
            <Image
      
              src = "https://bitbucket.org/ugamc/uga-global-footer/raw/e0c8a5d1e7e8950a9c2f767c7e941f5b2e5c70ae/src/_assets/img/GEORGIA-FS-CW.svg"
              alt="UGA Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-base">© University of Georgia</span>
        </div>

        {/* Footer links */}
        <div className="flex flex-col items-center space-y-2">
          <a href="https://eits.uga.edu/resources/" className="hover:underline">Resources</a>
          <a href="https://warnell.uga.edu/resources-students" className="hover:underline">Contact Warnell IT</a>
          <a href="https://my.uga.edu/htmlportal/index.php?guest=normal/render.uP" className="hover:underline">MyUGA</a>
          <a href="https://eits.uga.edu/support/" className="hover:underline">Help</a>
        </div>
      </footer>
      

        </div>
    </div>
  );
}
