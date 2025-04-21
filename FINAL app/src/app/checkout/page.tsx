"use client"

import React, { useState, useEffect } from 'react';
import '.././css/CheckoutPage.css';
import Image from "next/image";
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const router = useRouter();
  const [headsetQuantity, setHeadsetQuantity] = useState<number>(0);
  const [checkoutDate, setCheckoutDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

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
    <div className="checkout-container min-h-screen flex flex-col">
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
          <form onSubmit={handleSubmit}>
            <button className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-gray-800 transition">
              Logout
            </button>
          </form>
        </div>
      </header>

      {/* 
      USER ID SECTION REMOVED 
      */}

      <div className="info-section bg-white p-8 my-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Reservation Information</h2>
        <p className="mb-4">
          Reservations are first come, first serve.<br />
          Headsets may be reserved up to a week in advance.<br />
          Headsets must be returned on the day specified.
        </p>
        <p>
          For technical questions, please visit the Warnell IT office in building 4, room 424<br />
          or contact (706)-542-6695.
        </p>
      </div>

      <div className="reservation-form bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Reservation Details</h2>
        <form onSubmit={handleReservationSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="headsetQuantity" className="block mb-2 font-medium">
              Headset Amount:
            </label>
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

          <div className="form-group">
            <label htmlFor="returnDate" className="block mb-2 font-medium">
              Return Date:
            </label>
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

      <div className="youtube-search bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-6">Search YouTube Videos</h2>
        <form onSubmit={handleSearch} className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search for VR tutorials..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
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

        <div className="video-results space-y-4 max-h-96 overflow-y-auto">
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

      <div className="pb-48"></div>

      <footer className="bg-black text-white p-6 mt-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative w-40 h-16 mr-4">
              <Image
                src="https://bitbucket.org/ugamc/uga-global-footer/raw/e0c8a5d1e7e8950a9c2f767c7e941f5b2e5c70ae/src/_assets/img/GEORGIA-FS-CW.svg"
                alt="UGA Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-sm">© University of Georgia</span>
          </div>

          <div className="grid grid-cols-2 md:flex gap-6">
            <a href="https://eits.uga.edu/resources/" className="hover:underline text-sm">Resources</a>
            <a href="https://warnell.uga.edu/resources-students" className="hover:underline text-sm">Contact IT</a>
            <a href="https://my.uga.edu/htmlportal/index.php?guest=normal/render.uP" className="hover:underline text-sm">MyUGA</a>
            <a href="https://eits.uga.edu/support/" className="hover:underline text-sm">Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutPage;
