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

      <footer>
        <div className="links-column">
          <a href="https://eits.uga.edu/resources/" target="_blank" rel="noopener noreferrer">Resources</a>
          <a href="https://warnell.uga.edu/resources-students" target="_blank" rel="noopener noreferrer">Contact Warnell IT</a>
          <a href="https://my.uga.edu/htmlportal/index.php?guest=normal/render.uP" target="_blank" rel="noopener noreferrer">MYUGA</a>
          <a href="https://eits.uga.edu/support/" target="_blank" rel="noopener noreferrer">Help</a>
        </div>
        <div style={{ textAlign: "center", width: "100%", marginTop: "5px" }}>
          © University of Georgia.
        </div>
      </footer>

      <Image src="/univ.png" alt="UGA Logo" className="vr-logo" width={200} height={150} priority />
    </div>
  );
};

export default CheckoutPage;
