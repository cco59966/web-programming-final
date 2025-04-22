"use client"

import React, { useState, useEffect } from 'react';
//import '.././css/CheckoutPage.css';
import Image from "next/image";
import { useRouter } from 'next/navigation';
//import '.././css/VRPage.css';

const CheckoutPage = () => {
  const router = useRouter();
  const [headsetQuantity, setHeadsetQuantity] = useState<number>(0);
  const [checkoutDate, setCheckoutDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserId(user._id);
        setUserName(user.name || user.username || null);
        console.log("User loaded:", user._id, user.name);
      } catch (err) {
        console.error("Failed to parse stored user:", err);
      }
    } else {
      console.warn("No user found in localStorage");
    }
  }, []);

  const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    localStorage.removeItem("user");
  

    fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
  
 
    router.push("/home");
  };
  

  const handleSubmit2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('home');
  };

  const handleSubmit3 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('authenticated');
  };

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const reservationData = {
      type: "checkout",
      data: {
        quantity: headsetQuantity,
        checkoutDate,
        returnBy: returnDate,
        userId,
      },
    };

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
        credentials: "include",
      });

      const resultText = await response.text();
      console.log("Server response:", resultText);

      if (response.ok) {
        setSuccessMessage(`Reservation for ${headsetQuantity} headset(s) was successful. Thanks!`);
        console.log("Reservation saved.");
        setHeadsetQuantity(0);
        setCheckoutDate('');
        setReturnDate('');
        setTimeout(() => setSuccessMessage(null), 4000);
      } else {
        setSuccessMessage('Failed to make reservation:( Please try again.');
        console.error("Reservation failed to save:", response.status, resultText);
      }
    } catch (error) {
      setSuccessMessage(null);
      console.error("Error submitting reservation:", error);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(undefined);
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?` +
        `part=snippet&type=video&maxResults=10` +
        `&q=${encodeURIComponent(searchQuery)}` +
        `&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      );
      const data = await res.json();
      if (res.ok) {
        setVideos(data.items || []);
      } else {
        setError(data.error?.message || 'API error');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container min-h-screen flex flex-col bg-[#eed6ea]">

      <header className="bg-[#BA0C2F] text-black flex justify-between items-center px-8 py-6">
        <div className="flex items-center justify-start">
          <h1 className="text-3xl font-bold text-left">
            {userName ? `Welcome, ${userName}` : 'Warnell VR Checkout System'}
          </h1>
        </div>
        <div className="flex gap-4">
          <form onSubmit={handleSubmit2}>
            <button className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-gray-800 transition">
              Return Home
            </button>
          </form>
          <form onSubmit={handleSubmit3}>
            <button className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-gray-800 transition">
              View Reservations
            </button>
          </form>
          <form onSubmit={handleLogout}>
            <button className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-gray-800 transition">
              Logout
            </button>
          </form>
        </div>
      </header>
   
      {successMessage && (
        <div className="bg-green-100 text-green-800 px-4 py-3 text-center font-medium">
          {successMessage}
        </div>
      )}
     
      <div className="w-full max-w-[90%] mx-auto flex flex-col lg:flex-row gap-6 mt-1 px-4">

{/* Reservation Info + Form */}
<div className="flex-1 bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-2xl font-semibold mb-4">Reservation Information</h2>
  <p className="mb-4">

    Headsets must be returned on the day specified.
 
    For technical questions, visit the Warnell IT office (building 4, room 424)
    or contact (706)-542-6695.
  </p>

  <h2 className="text-2xl font-semibold mt-6 mb-4">Reservation Details</h2>
  <form onSubmit={handleReservationSubmit} className="space-y-6">
    <div>
      <label htmlFor="headsetQuantity" className="block mb-2 font-medium">Headset Amount:</label>
      <input
        type="number"
        id="headsetQuantity"
        name="headsetQuantity"
        value={headsetQuantity}
        min="1"
        onChange={(e) => setHeadsetQuantity(Number(e.target.value))}
        className="w-full p-2 border rounded"
        required
      />
    </div>

    <div>
      <label htmlFor="returnDate" className="block mb-2 font-medium">Return Date:</label>
      <input
        type="date"
        id="returnDate"
        name="returnDate"
        value={returnDate}
        onChange={(e) => setReturnDate(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
    </div>

    <button
      type="submit"
      className="w-full bg-[#BA0C2F] text-white py-3 rounded font-semibold hover:bg-[#9a0a2a] transition"
    >
      Submit Reservation
    </button>
  </form>
</div>

{/* YouTube Search */}
<div className="flex-1 bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-2xl font-semibold mb-4">Don't know what to watch, search here!</h2>
  <form onSubmit={handleSearch} className="flex gap-4 mb-6">
    <input
      type="text"
      placeholder="Search for videos..."
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value) + "360 videos"}
      className="flex-grow p-2 border rounded"
    />
    <button
      type="submit"
      className="bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-800 transition"
    >
      Search
    </button>
  </form>

  {loading && <p className="text-center py-4">Loading results...</p>}
  {error && <p className="text-red-600 text-center py-4">{error}</p>}

  <div className="space-y-4 max-h-96 overflow-y-auto">
    {videos.map(video => (
      <a
        key={video.id.videoId}
        href={`https://youtu.be/${video.id.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded transition"
      >
        <img
          src={video.snippet.thumbnails.default.url}
          alt={video.snippet.title}
          width={120}
          height={90}
          className="rounded"
        />
        <div>
          <h3 className="font-medium">{video.snippet.title}</h3>
          <p className="text-sm text-gray-600">{video.snippet.channelTitle}</p>
        </div>
      </a>
    ))}
  </div>
</div>
</div>


          <footer className="bg-black text-white p-0.5 flex flex-col sm:flex-row justify-between items-center">
               {/* Left side: UGA Logo + © text */}
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
       
               {/* Right side: Links */}
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