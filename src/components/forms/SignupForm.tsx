"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Eye, EyeOffIcon } from "lucide-react";
import { Button } from "../ui/button";
import google from "@/components/icons/google.svg";
import Image from "next/image";

const SignupForm = () => {

  const [show, setShow] = useState<boolean>(false);


  return (
    <div className="flex gap-6 flex-col">
      <div className="flex space-y-4 flex-col">
        {/* email adress input */}
        <div className="flex flex-col gap-2 font-normal text-sm">
          <label htmlFor="email" className="text-sm">
            Email Address
          </label>
          <Input
            name="email"
            placeholder="Enter your email address"
            className="rounded-sm placeholder:text-sm placeholder:text-[#667085] shadow-none  "
          />
        </div>

        {/* username input */}

        <div className="flex flex-col gap-2 font-normal text-sm">
          <label htmlFor="username" className="text-sm">
            Username
          </label>
          <Input
            placeholder="e.g Oluwarotimi_"
            name="username"
            className="rounded-sm placeholder:text-sm placeholder:text-[#667085] shadow-none  "
          />
        </div>

       <div className="flex flex-col gap-2 font-normal text-sm">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <div className="flex border border-border rounded-sm pr-3 w-full items-center flex-row">
            <Input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="rounded-sm placeholder:text-sm placeholder:text-[#667085] outline-none focus:outline-none focus:border-none border-none focus:ring-0   focus-visible:ring-[0px] shadow-none  "
            />

            <Button className="" onClick={()=>setShow(!show) } variant="ghost">
              {show ? (
                <Eye className="font-extralight text-[#667085] " />
              ) : (
                <EyeOffIcon className="font-extralight text-[#667085] " />
              )}
            </Button>
          </div>
        </div>

        <Button className="mt-4">Create Account</Button>
      </div>

      {/* third party sign in */}
      <div className="flex space-y-[10px] flex-col ">
        <Button className=" rounded-[8px] bg-transparent border flex flex-row shadow-none text-black   ">
          <span>
            {" "}
            <Image
              src={google}
              height={24}
              width={24}
              alt="google icon"
              className="h-6 w-6"
            />{" "}
          </span>
          <span>Sign in with Google</span>
        </Button>

        <Button className=" rounded-[8px] bg-transparent border flex flex-row shadow-none text-black   ">
          <span>
            {" "}
            <Image
              src={google}
              height={24}
              width={24}
              alt="google icon"
              className="h-6 w-6"
            />{" "}
          </span>
          <span>Sign in with Google</span>
        </Button>
      </div>
    </div>
  );
};

export default SignupForm;
