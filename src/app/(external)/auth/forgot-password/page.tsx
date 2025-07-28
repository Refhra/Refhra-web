import ForgotPasswordFormForm from "@/components/forms/ForgotPasswordForm";
import React from "react";

const ForgotPasswordForm = () => {
  return (
    <>
      <div className="flex h-screen w-screen flex-row">
        <div className="lg:flex w-[47%] hidden  bg-gray-300 "></div>

        <section className="flex h-full flex-1 px-6 pt-4  items-center justify-center">
          <div className="justify-center  flex flex-col ">
            <div className="text-9 h-[31px] lg:hidden  font-bold mb-8 ">
              Refhra
            </div>
            <div className="flex gap-2  mb-8  text-start  flex-col">
              <h1 className="font-semibold  text-2xl leading-9 ">
                Forgot Password
              </h1>
              <p className="text-sm leading-[100%] font-normal">
                Enter your email address to recieve an OTP to reset
                password{" "}
              </p>
            </div>

            <ForgotPasswordFormForm />
          </div>
        </section>
      </div>
      ;
    </>
  );
};

export default ForgotPasswordForm;
