'use client'

import React from 'react';
import '.././css/CheckoutPage.css';
import Image from "next/image";
import connectMongoDB from "../config/mongodb";
import { useRouter } from 'next/navigation';
import '.././css/VRPage.css';


const CheckoutPage: React.FC = () => {
  const router = useRouter();
  
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
 
    router.push('authenticated'); // ✅ Redirect to desired page
  
};
const handleSubmit3 = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // Handle form submission logic here
  console.log('Form submitted');
 
    router.push('home'); // ✅ Redirect to desired page
  
};
  return (
    
    <div className="min-h-screen flex flex-col">
    {/* HEADER (Red Bar) */}
    <header className="bg-[#b20000] text-black flex justify-between items-center px-8 py-6">
      <div className = "flex items-center justify-start">
    
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
      View Current Reservations
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

      {/* Info box on the left-hand side */}
      <div className="info">
        Please select desired pickup date for VR headsets.<br />
        Reservations are first come, first serve.<br />
        Headsets may be reserved up to a week in advance.<br />
        Headsets must be returned within 24 hours.<br /><br />
        If you have any questions regarding technology please visit the Warnell IT office,<br />
        located in building 4, room 424 or contact (678)-599-3529.
      </div>
      
      {/* Reservation form in the center of the page */}
      <div className="reservation">
        <h2>Reservation Details</h2>
        <form action="#" method="POST">
          <label htmlFor="headsetQuantity">How many headsets would you want:</label>
          <input type="number" id="headsetQuantity" name="headsetQuantity" min="1" required />
          
          <label htmlFor="checkoutDate">Choose checkout date:</label>
          <input type="date" id="checkoutDate" name="checkoutDate" required />
        
          
          <label htmlFor="endDate">Return date:</label>
          <input type="date" id="endDate" name="endDate" required />
          
          <button type="submit">Submit Reservation</button>
        </form>
      </div>

      {/* FOOTER (Black Bar) */}
      <footer className="bg-black text-white p-0.5 flex items-center w-full">
        {/* Left: UGA Logo & Text */}
        <div className="mr-auto flex items-center space-x-4">
          <div className="relative w-40 h-20">
            <Image
              //src="/uga-logo.png"        // in /public/uga-logo.png
              src = "https://bitbucket.org/ugamc/uga-global-footer/raw/e0c8a5d1e7e8950a9c2f767c7e941f5b2e5c70ae/src/_assets/img/GEORGIA-FS-CW.svg"
              alt="UGA Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="ml-4 text-base">© University of Georgia</span>
        </div>

        {/* Right: Footer Links */}
        <div className="flex flex-col items-center space-y-2">
          <a href="https://eits.uga.edu/resources/" className="hover:underline">Resources</a>
          <a href="https://warnell.uga.edu/resources-students" className="hover:underline">Contact Warnell IT</a>
          <a href="https://my.uga.edu/htmlportal/index.php?guest=normal/render.uP" className="hover:underline">MyUGA</a>
          <a href="https://eits.uga.edu/support/" className="hover:underline">Help</a>
        </div>
      </footer>

      <Image src="/univ.png" alt="UGA Logo" className="vr-logo" width={200} height={150} priority />
    </div>
  );
};

export default CheckoutPage;
