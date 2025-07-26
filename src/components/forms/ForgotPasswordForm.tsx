"use client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

const ForgotPasswordForm = () => {
  return (
    <div className="flex gap-6 flex-col">
      <div className="flex space-y-8 flex-col">
        {/* email adress input */}
        <div className="flex flex-col gap-2 font-normal text-sm">
          <label htmlFor="email" className="text-sm">
            Email Address
          </label>
          <Input
            type="email"
            name="email"
            
            placeholder="Enter your email address"
            className="rounded-sm placeholder:text-sm placeholder:text-[#667085] focus-visible:border  focus:border focus:border-input shadow-none  "
          />
        </div>

        <div className="flex w-full text-sm space-y-4 flex-col ">
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
