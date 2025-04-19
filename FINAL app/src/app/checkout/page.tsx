"use client"

import React, { useState } from 'react';
import '.././css/CheckoutPage.css';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { set } from 'mongoose';

const CheckoutPage = () => {
  const router = useRouter();
  const [headsetQuantity, setHeadsetQuantity] = useState<number>(0);
 const [checkoutDate, setCheckoutDate] = useState<string>('');
 // const [startDate, setStartDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');

  const [messageName, setMessageName] = useState<string>('');
  const [messageMessage, setMessageMessage] = useState<string>('');

  const userId = "67f68c137a5d74179328d274"; // CHANGE THIS WHEN LOGIN IS WORKIGN CORRECTLY

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
    router.push('/login');
  };

  const handleSubmit2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
    router.push('home');
  };

  const handleSubmit3 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
    router.push('authenticated');
  };

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!userId) {
      console.error("User not logged in.");
      return;
    }
  
    const reservationData = {
      type: "checkout",
      data: {
        quantity: headsetQuantity, 
        userId,
        returnBy: returnDate,
      },
    };
  
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      });
  
      if (response.ok) {
        console.log("Reservation saved.");
        setHeadsetQuantity(0);
        setCheckoutDate('');
        setReturnDate('');
      } else {
        console.error("Reservation failed to save.");
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
    }
  };
  
  

  const handleAddMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ messageName, messageMessage });
    setMessageName('');
    setMessageMessage('');
  };

  return (
    <div>
      <header className="bg-[#BA0C2F] text-black flex justify-between items-center px-8 py-6">
        <div className="flex items-center justify-start">
          <h1 className="text-3xl font-bold text-left">Warnell VR Checkout System</h1>
        </div>
        <form onSubmit={handleSubmit2}>
          <button className="bg-black text-white px-4 py-2 rounded font-semibold">
            Return Home
          </button>
        </form>
        <form onSubmit={handleSubmit3}>
          <button className="bg-black text-white px-4 py-2 rounded font-semibold">
            View Current Reservations
          </button>
        </form>
        <form onSubmit={handleSubmit}>
          <button className="bg-black text-white px-4 py-2 rounded font-semibold">
            Logout
          </button>
        </form>
      </header>

      <div className="info">
        Reservations are first come, first serve.<br /><br />

        Headsets may be reserved up to a week in advance.<br /><br />
        Headsets must be returned on the day specificed.<br /><br />
        If you have any questions regarding technology please visit the Warnell IT office,
        located in building 4, room 424 or contact (706)-542-6695.
      </div>

      <div className="reservation">
        <h2>Reservation Details</h2>
        <form onSubmit={handleReservationSubmit}>
          <label htmlFor="headsetQuantity">Headset Amount:</label>
          <input
            type="number"
            id="headsetQuantity"
            name="headsetQuantity"
            value={headsetQuantity}
            min="1"
            onChange={(e) => setHeadsetQuantity(Number(e.target.value))}
            required
          />

          <label htmlFor="startDate">Checkout Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={checkoutDate}
            onChange={(e) => setCheckoutDate(e.target.value)}
            required
          />

          <label htmlFor="returnDate">Return Date:</label>
          <input
            type="date"
            id="returnDate"
            name="returnDate"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
          />

          <button type="submit">Submit Reservation</button>
        </form>
      </div>

       <div className="add-item">
        <h2><strong>Have A Message You Would Like To Post?</strong></h2>
        <form onSubmit={handleAddMessageSubmit}>
          <label htmlFor="messageName">Your Name:</label>
          <input
            type="text"
            id="headsetName"
            name="headsetName"
            value={messageName}
            onChange={(e) => setMessageName(e.target.value)}
            required
          />

          <label htmlFor="messageMessage">Your Message:</label>
          <input
            type="text"
            id="headsetCount"
            name="headsetCount"
            value={messageMessage}
            min="1"
            onChange={(e) => setMessageMessage((e.target.value))}
            required
          />

          <button type="submit">Add Message</button>
        </form>
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
