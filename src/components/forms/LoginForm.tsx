"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Eye, EyeOffIcon } from "lucide-react";
import { Button } from "../ui/button";
import google from "@/components/icons/google.svg";
import Image from "next/image";
import Link from "next/link";

const LoginForm = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="flex gap-6 flex-col">
      <div className="flex gap-4 flex-col">
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

        {/* password input */}
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

        <div className="flex items-center h-full justify-between flex-row">
          <div className="flex-row items-center gap-1 flex">
            <span className="">
              <Input
                name="remember"
                className="remember text-sm"
                type="checkbox"
              />
            </span>
            <span>
              <label
                htmlFor=".remember"
                className="font-normal leading-[100%] text-sm"
              >
                Remember me
              </label>
            </span>
          </div>

          <Link className="text-sm font-normal" href="/auth/forgot-password">
            {" "}
            Forgot Password{" "}
          </Link>
        </div>

        <Button className="mt-4">Login</Button>
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

      <div className="flex w-full text-sm p-2 font-normal items-center justify-center">
        <span> Don&apos;t have an account? </span>
        <span className="text-blue-400 px-2 ">
          <Link className="text-sm font-normal" href="/auth/sign-up">
            {" "}
            Sign up{" "}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
