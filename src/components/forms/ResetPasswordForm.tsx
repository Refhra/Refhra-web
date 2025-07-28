"use client";
import { Input } from "../ui/input";
import { Eye, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const ForgotPasswordForm = () => {
  const [show, setShow] = useState<boolean>(false);
  const [showNew, setShowNew] = useState<boolean>(false);

  return (
    <div className="flex gap-6 flex-col">
      <div className="flex space-y-4 flex-col">
        {/* email adress input */}
        <div className="flex flex-col gap-2 font-normal text-sm">
          <label htmlFor="password" className="text-sm">
            Enter new password
          </label>
          <div className="flex border border-border rounded-sm pr-3 w-full items-center flex-row">
            <Input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="rounded-sm placeholder:text-sm placeholder:text-[#667085] outline-none focus:outline-none focus:border-none border-none focus:ring-0   focus-visible:ring-[0px] shadow-none  "
            />

            <Button className="" onClick={() => setShow(!show)} variant="ghost">
              {show ? (
                <Eye className="font-extralight text-[#667085] " />
              ) : (
                <EyeOffIcon className="font-extralight text-[#667085] " />
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2 font-normal text-sm">
          <label htmlFor="password" className="text-sm">
            Confirm new password
          </label>
          <div className="flex border border-border rounded-sm pr-3 w-full items-center flex-row">
            <Input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="rounded-sm placeholder:text-sm placeholder:text-[#667085] outline-none focus:outline-none focus:border-none border-none focus:ring-0   focus-visible:ring-[0px] shadow-none  "
            />

            <Button
              className=""
              onClick={() => setShowNew(!showNew)}
              variant="ghost"
            >
              {showNew ? (
                <Eye className="font-extralight text-[#667085] " />
              ) : (
                <EyeOffIcon className="font-extralight text-[#667085] " />
              )}
            </Button>
          </div>
        </div>

        <div className="flex w-full mt-4 text-sm space-y-4 flex-col ">
          <Button className="    ">
            <span className="text-sm">send</span>
          </Button>

          <Link className="w-full" href="/auth/sign-in">
            <Button
              variant="outline"
              className=" w-full rounded-[8px] text-sm bg-transparent border flex flex-row shadow-none text-black   "
            >
              <span className="text-sm">Back to Login</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
