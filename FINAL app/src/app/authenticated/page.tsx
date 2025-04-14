"use client"

import { useState } from "react";
import Image from "next/image";
import connectMongoDB from ".././config/mongodb";
import '.././css/VRPage.css';
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
   
      router.push('checkout-page'); // ✅ Redirect to desired page
    
  };
  const handleSubmit3 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
   
      router.push('/'); // ✅ Redirect to desired page
    
  };
  connectMongoDB();


const dummyHeadsets = [
  {
    id: 1,
    name: 'Meta Quest 2',
    image: 'data:image/jpeg;base64,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'},
  {
    id: 2,
    name: 'Meta Quest 3',
    image: 'data:image/jpeg;base64,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',
  },
  {
    id: 3,
    name: 'Meta Quest Pro',
    image: 'data:image/png;base64,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',
  },
];

const HeadsetItem = ({ id, name, image }: { id: number; name: string; image: string }) => (
    <div className="w-full mb-8">
      <div className="flex bg-white shadow-md rounded-xl p-6 h-[200px]">
        
        {/* Image Section */}
        <div className="flex-1 flex justify-center items-center">
          <Image src={image} alt={name} width={200} height={150} priority />
        </div>
  
        {/* Text Section */}
        <div className="flex-1 flex flex-col justify-center pl-4">
          <h3 className="text-xl font-semibold text-gray-800">Headset #{id}</h3>
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
  
    
  <div className="vr-container2">
    

    

  

      




    <div>

      
      <div className="overflow-y-auto h-[600px] pr-4">
      <div className="headset-list">
        {dummyHeadsets.map((headset) => (
          <HeadsetItem key={headset.id} id={headset.id} name={headset.name} image={headset.image} />
        ))}
      </div>
    </div>
    </div>
      <footer className="vr-footer">
      <img src="https://bitbucket.org/ugamc/uga-global-footer/raw/e0c8a5d1e7e8950a9c2f767c7e941f5b2e5c70ae/src/_assets/img/GEORGIA-FS-CW.svg" alt="UGA Logo" className="vr-logo" height="20px" />
 
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
     
        <div className="vr-copyright">
          © University of Georgia.
        </div>
      </footer>

        </div>
    </div>
  );
}

