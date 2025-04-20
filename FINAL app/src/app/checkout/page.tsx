"use client"

import React, { useState } from 'react';
import '.././css/CheckoutPage.css';
import Image from "next/image";
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const router = useRouter();
  const [headsetQuantity, setHeadsetQuantity] = useState<number>(0);
  const [checkoutDate, setCheckoutDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');

  // YouTube search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const userId = "67f68c137a5d74179328d274"; // CHANGE THIS WHEN LOGIN IS WORKING CORRECTLY

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/login');
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
    if (!userId) {
      console.error("User not logged in.");
      return;
    }
    const reservationData = {
      type: "checkout",
      data: {
        quantity: headsetQuantity,
        userId,
        //checkoutDate,
        returnBy: returnDate,
      },
    };
    
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      });
    
      const resultText = await response.text(); // 🔥 read even if it's not ok
      console.log("Server response:", resultText);
    
      if (response.ok) {
        console.log("Reservation saved.");
        setHeadsetQuantity(0);
        setCheckoutDate('');
        setReturnDate('');
      } else {
        console.error("Reservation failed to save:", response.status, resultText);
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
    }
    
  }
  // YouTube search handler
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
        Headsets must be returned on the day specified.<br /><br />
        If you have any questions regarding technology please visit the Warnell IT office,<br />
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

      {/* YouTube Search Block */}
      <div className="add-item">
        <h2><strong>Search YouTube Videos</strong></h2>
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="border px-2 py-1 flex-grow"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-1 rounded"
          >
            Search
          </button>
        </form>

        {loading && <p>Loading results…</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="results max-h-80 overflow-y-scroll space-y-4">
          {videos.map(video => (
            <a
              key={video.id.videoId}
              href={`https://youtu.be/${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <img
                src={video.snippet.thumbnails.default.url}
                alt={video.snippet.title}
                width={120}
                height={90}
              />
              <span>{video.snippet.title}</span>
            </a>
          ))}
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
