"use client";

import { useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import connectMongoDB from ".././config/mongodb";
import { useRouter } from "next/navigation";


const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 duration-300">
      {children}
    </div>
  );
};


const HeadsetItem = ({
  id,
  name,
  image,
  onReturnSuccess,
}: {
  id: number;
  name: string;
  image: string;
  onReturnSuccess: () => void;
}) => {
  const handleReturn = async () => {
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "return",
          data: { headsetId: id },
        }),
      });

      const result = await res.json();
      if (res.ok) {
        onReturnSuccess();
      } else {
        console.error("Failed to return headset:", result.error);
      }
    } catch (error) {
      console.error("Error returning headset:", error);
    }
  };

  return (
    <Card>
      <Image
        src={image}
        alt={name}
        width={250}
        height={180}
        className="rounded-xl object-cover mb-4"
      />
      <h3 className="text-lg font-bold text-gray-800 mb-2">Meta Quest #{id}</h3>
      <p className="text-sm text-gray-600 mb-4">{name}</p>
      <button
        onClick={handleReturn}
        className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-gray-800 transition"
      >
        Return
      </button>
    </Card>
  );
};

// ✅ Main Home component
export default function Home() {
  const router = useRouter();
  const [headsets, setHeadsets] = useState([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [returnMessage, setReturnMessage] = useState<string | null>(null);

  const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.removeItem("user");
    fetch("/api/logout", { method: "POST", credentials: "include" });
    router.push("/signup");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;
        const parsedUser = JSON.parse(storedUser);
        const extractedUserId = parsedUser._id;
        setUserId(extractedUserId);

        const res = await fetch("/api/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "getCheckedOut",
            data: { userId: extractedUserId },
          }),
        });

        const json = await res.json();
        setHeadsets(json.headsets || []);
      } catch (err) {
        console.error("Failed to fetch headsets:", err);
      }
    };

    fetchData();
  }, []);

  const handleReturnSuccess = () => {
    setReturnMessage("Returned 1 headset. Thanks!!!");
    setTimeout(() => setReturnMessage(null), 4000);

    if (userId) {
      fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "getCheckedOut",
          data: { userId },
        }),
      })
        .then((res) => res.json())
        .then((json) => setHeadsets(json.headsets || []))
        .catch((err) => console.error("Failed to refresh headsets:", err));
    }
  };

  connectMongoDB();

  return (
    <div className="min-h-screen flex flex-col bg-[#f2cbec]">
      {/* Header */}
      <header className="bg-[#BA0C2F] text-black flex justify-between items-center px-8 py-6">
        <h1 className="text-3xl font-bold">Warnell VR Checkout System</h1>
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/message")}
            className="bg-black text-white px-4 py-2 rounded font-semibold"
          >
            Messages
          </button>
          <button
            onClick={() => router.push("/home")}
            className="bg-black text-white px-4 py-2 rounded font-semibold"
          >
            Return Home
          </button>
          <button
            onClick={() => router.push("/checkout")}
            className="bg-black text-white px-4 py-2 rounded font-semibold"
          >
            Add Items
          </button>
          <form onSubmit={handleLogout}>
            <button className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-gray-800 transition">
              Logout
            </button>
          </form>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow px-8 py-6">
        {returnMessage && (
          <div className="bg-green-100 text-green-800 px-4 py-2 text-center font-semibold mb-6 rounded shadow">
            {returnMessage}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {headsets.map((headset: any) => (
            <HeadsetItem
              key={headset._id}
              id={headset.id}
              name={`Return by ${new Date(
                headset.returnBy
              ).toLocaleDateString()}`}
              image="https://90a1c75758623581b3f8-5c119c3de181c9857fcb2784776b17ef.ssl.cf2.rackcdn.com/640021_305565_02_front_comping.jpg"
              onReturnSuccess={handleReturnSuccess}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white p-4 flex flex-col sm:flex-row justify-between items-center">
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
          <a href="https://eits.uga.edu/resources/" className="hover:underline">
            Resources
          </a>
          <a
            href="https://warnell.uga.edu/resources-students"
            className="hover:underline"
          >
            Contact Warnell IT
          </a>
          <a
            href="https://my.uga.edu/htmlportal/index.php?guest=normal/render.uP"
            className="hover:underline"
          >
            MyUGA
          </a>
          <a href="https://eits.uga.edu/support/" className="hover:underline">
            Help
          </a>
        </div>
      </footer>
    </div>
  );
}
