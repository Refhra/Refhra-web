"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {



  const [activeNav, setActiveNav] = useState("");
  // const storage = sessionStorage
// const activeLink = sessionStorage.getItem("activeNav")
// console.log(activeLink)


  return (
    <>
      <div className=" text-white p-2 w-screen mt-6 flex gap-4 justify-center">
        <div className="flex bg-black space-x-12 p-4 px-8 rounded-3xl flex-row">
          <div className="flex flex-col">
            <p onClick={() => setActiveNav("Home")}>
              <Link className="  p-2" href="/">
                Home
              </Link>
            </p>
            {activeNav === "Home" && <div className="w-full  border"></div>}
          </div>
          {/* <Link className='border-b items-center block border-white p-2' href="/dashboard">Dashboard</Link> */}

          <div className="flex flex-col">
            <p onClick={() => setActiveNav("About")}>
              <Link className="  p-2" href="/about">
                About
              </Link>
            </p>
            {activeNav === "About" && (
              <div className="w-full  border"></div>
            )}
          </div>

          <div className="flex flex-col">
            <p onClick={() => setActiveNav("Contact")  }>
              <Link className="  p-2" href="/contact">
                Contact
              </Link>
            </p>
            {activeNav === "Contact" && <div className="w-full  border"></div>}
          </div>

         

          <div className="flex flex-col">
            <p onClick={() => setActiveNav("Faq")}>
              <Link className="  p-2" href="/faq">
                Faq
              </Link>
            </p>
            {activeNav === "Faq" && <div className="w-full ease-in-out animate-in border"></div>}
          </div>
        </div>
      </div>
    </>
  );
}
