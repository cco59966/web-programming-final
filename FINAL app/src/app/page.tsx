"use client"

import { useState } from "react";
import Image from "next/image";
import connectMongoDB from "./config/mongodb";

export default function Home() {
  // State for login toggle
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  connectMongoDB();


  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] p-8 sm:p-20 gap-8 font-sans">
      {/* Header: Red Bar with Title and Login Button */}
      <header className="w-full bg-[#b20000] text-white flex justify-between items-center p-4">
        <h1 className="text-lg font-bold">Warnell VR Checkout System</h1>
        <button
          onClick={handleLogin}
          className="bg-white text-[#b20000] px-4 py-2 rounded font-semibold"
        >
          {isLoggedIn ? "Log Out" : "Login"}
        </button>
      </header>

      {/* Main Content: Custom Splash + Default Next.js Template */}
      <main className="flex flex-col items-center justify-center gap-12">
        {/* Custom Splash Section: Two Columns */}
        <div className="flex flex-col sm:flex-row gap-8 w-full max-w-4xl items-center">
          {/* Left Column: Instructions + VR Headset Image */}
          <div className="flex-1 flex flex-col items-center sm:items-start gap-4">
            <p className="text-xl text-center sm:text-left">
              Login using your UGA email to access our VR Headset Checkout System for labs and projects.
            </p>
            <div className="w-full max-w-xs">
              <Image
                src="/headset.png" // Place your VR image in /public/
                alt="VR Headset"
                width={300}
                height={200}
                className="object-contain"
              />
            </div>
          </div>
          
          {/* Right Column: Building Info & Image */}
          <div className="flex-1 flex flex-col items-center sm:items-start gap-4">
            <p className="text-base text-center sm:text-left">
              If you have any questions regarding technology, please visit the Warnell IT office located in building 4, room 424.
            </p>
            <div className="w-full max-w-xs">
              <Image
                src="/warnell-building.jpg" // Place your building image in /public/
                alt="Warnell Building"
                width={300}
                height={200}
                className="object-cover rounded"
              />
            </div>
          </div>
        </div>

        {/* Default Next.js Template Content */}
        <div className="text-center">
          <Image
            className="dark:invert mx-auto"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <ol className="list-decimal list-inside text-sm font-mono mt-4">
            <li className="mb-2 tracking-tight">
              Get started by editing{" "}
              <code className="bg-black/5 dark:bg-white/6 px-1 py-0.5 rounded font-mono font-semibold">
                src/app/page.tsx
              </code>
              .
            </li>
            <li className="tracking-tight">
              Save and see your changes instantly.
            </li>
          </ol>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center">
            <a
              className="rounded-full border border-transparent transition-colors bg-gray-800 text-white flex items-center justify-center gap-2 px-4 py-2"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy now
            </a>
            <a
              className="rounded-full border border-gray-300 transition-colors flex items-center justify-center px-4 py-2"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </a>
          </div>
        </div>
      </main>

      {/* Footer: Navigation Links */}
      <footer className="w-full border-t pt-4 flex flex-wrap items-center justify-center gap-4">
        <a
          className="flex items-center gap-2 hover:underline"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden="true"
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden="true"
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden="true"
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
