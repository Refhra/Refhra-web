"use client";
// import { useState } from "react";
import { Bell, Calendar } from "lucide-react";

export default function Navbar() {
  //   const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex  flex-col items-center w-full">
      <nav className="bg-white pl-10 xl:pl-24 font-bold text-2xl flex justify-between items-center w-full z-50">
        <div className="flex ">Welcome Taiwo</div>
        <div className="max-w-7xl justify-between flex flex-row items-center  px-4 sm:px-6 lg:px-20">
          <div className="flex  h-16 items-center gap-4">
            {/* Deadlines Icon */}
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <Calendar className="w-6 h-6 text-gray-700" />
            </button>

            {/* Notification Icon */}
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <Bell className="w-6 h-6 text-gray-700" />
              {/* Notification badge */}
              <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>
        </div>
      </nav>
      <div className="border-b w-[90%] "></div>
    </div>
  );
}
