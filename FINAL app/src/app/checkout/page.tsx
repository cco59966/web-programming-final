"use client"

import React, { useState } from 'react'; // Import React and the useState hook for state management
import '.././css/CheckoutPage.css'; // Import the associated CSS for styling
import Image from "next/image"; // Import Image component for optimized image handling
import { useRouter } from 'next/navigation'; // Import useRouter for navigation between pages

const CheckoutPage = () => {
  // State for reservation form
  const router = useRouter(); // Initialize the router for navigation
  const [headsetQuantity, setHeadsetQuantity] = useState<number>(0); // Quantity of headsets user wants to reserve
  const [checkoutDate, setCheckoutDate] = useState<string>(''); // Date of checkout
  const [startDate, setStartDate] = useState<string>(''); // Start date of reservation
  const [endDate, setEndDate] = useState<string>(''); // End date of reservation

  // State for add item form
  const [headsetName, setHeadsetName] = useState<string>(''); // Name of the headset being added
  const [headsetCount, setHeadsetCount] = useState<number>(0); // Quantity of the headset to be added


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
   
      router.push('home'); // ✅ Redirect to desired page
    
  };
  const handleSubmit3 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
   
      router.push('authenticated'); // ✅ Redirect to desired page
    
  };

  // Reservation form submit handler
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    console.log({ headsetQuantity, checkoutDate, startDate, endDate }); // Log the reservation details to console
    // Clear input fields after submission
    setHeadsetQuantity(0);
    setCheckoutDate('');
    setStartDate('');
    setEndDate('');
  };

  // Add item form submit handler
  const handleAddItemSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    console.log({ headsetName, headsetCount }); // Log the item details to console
    // Clear input fields after submission
    setHeadsetName('');
    setHeadsetCount(0);
  };

  return (
    <div>
      {/* HEADER (Red Bar) */}
      <header className="bg-[#BA0C2F] text-black flex justify-between items-center px-8 py-6">
        <div className = "flex items-center justify-start">
        {/* Button with Triangle */}
     
        <h1 className="text-3xl font-bold text-left">Warnell VR Checkout System</h1>
        </div>
        <form onSubmit={handleSubmit2}>
        <button
         
          className="bg-black text-white px-4 py-2 rounded font-semibold"
        >
         Return Home
        </button>
       </form>
        <form onSubmit={handleSubmit3}>
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

      {/* Info box on the left-hand side with instructions */}
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
        <form onSubmit={handleReservationSubmit}>
          <label htmlFor="headsetQuantity">How many headsets would you want:</label>
          <input
            type="number"
            id="headsetQuantity"
            name="headsetQuantity"
            value={headsetQuantity}
            min="1"
            onChange={(e) => setHeadsetQuantity(Number(e.target.value))}
            required
          />

          <label htmlFor="checkoutDate">Choose checkout date:</label>
          <input
            type="date"
            id="checkoutDate"
            name="checkoutDate"
            value={checkoutDate}
            onChange={(e) => setCheckoutDate(e.target.value)}
            required
          />

          <label htmlFor="startDate">Start date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />

          <label htmlFor="endDate">End date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />

          <button type="submit">Submit Reservation</button>
        </form>
      </div>

      {/* Add Item form positioned to the right side of the page */}
      <div className="add-item">
        <h2><strong>Add New Item</strong></h2>
        <form onSubmit={handleAddItemSubmit}>
          <label htmlFor="headsetName">Headset Name:</label>
          <input
            type="text"
            id="headsetName"
            name="headsetName"
            value={headsetName}
            onChange={(e) => setHeadsetName(e.target.value)}
            required
          />

          <label htmlFor="headsetCount">How many headsets:</label>
          <input
            type="number"
            id="headsetCount"
            name="headsetCount"
            value={headsetCount}
            min="1"
            onChange={(e) => setHeadsetCount(Number(e.target.value))}
            required
          />

          <button type="submit">Add Item</button>
        </form>
      </div>

      {/* FOOTER (Black Bar) */}
           <footer className="bg-black text-white p-0.5 flex flex-col sm:flex-row justify-between items-center">
             {/* Left: UGA Logo & Text */}
             <div className="flex items-center space-x-4 mb-4 sm:mb-0">
               <div className="relative w-40 h-20">
                 <Image
                   //src="/uga-logo.png"        // in /public/uga-logo.png
                   src = "https://bitbucket.org/ugamc/uga-global-footer/raw/e0c8a5d1e7e8950a9c2f767c7e941f5b2e5c70ae/src/_assets/img/GEORGIA-FS-CW.svg"
                   alt="UGA Logo"
                   fill
                   className="object-contain"
                 />
               </div>
               <span className="text-base">© University of Georgia</span>
             </div>
     
             {/* Right: Footer Links */}
             <div className="flex flex-col items-center space-y-2">
               <a href="https://eits.uga.edu/resources/" className="hover:underline">Resources</a>
               <a href="https://warnell.uga.edu/resources-students" className="hover:underline">Contact Warnell IT</a>
               <a href="https://my.uga.edu/htmlportal/index.php?guest=normal/render.uP" className="hover:underline">MyUGA</a>
               <a href="https://eits.uga.edu/support/" className="hover:underline">Help</a>
             </div>
           </footer>

    </div>
  );
};

export default CheckoutPage;
