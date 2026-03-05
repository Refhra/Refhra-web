"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Eye, EyeOffIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ResetPassword } from "@/schemas/auth";

const ForgotPasswordForm = () => {
  const [show, setShow] = useState<boolean>(false);
  const [showNew, setShowNew] = useState<boolean>(false);

  type LoginData = z.infer<typeof ResetPassword>;

  const form = useForm<LoginData>({
    resolver: zodResolver(ResetPassword),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (values: LoginData) => {
    console.log(values);
  };

  return (
    <div className="flex gap-6 flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex gap-4 flex-col"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex border border-border rounded-sm pr-3 w-full items-center flex-row">
                    <Input
                      {...field}
                      type={show ? "text" : "password"}
                      placeholder="Enter Password"
                      name="password"
                      className="rounded-sm placeholder:text-sm placeholder:text-[#667085] outline-none focus:outline-none focus:border-none border-none focus:ring-0   focus-visible:ring-[0px] shadow-none  "
                    />

                    <p className="" onClick={() => setShow(!show)}>
                      {show ? (
                        <Eye className="font-extralight h-4 w-4 text-[#667085] " />
                      ) : (
                        <EyeOffIcon className="font-extralight h-4 w-4 text-[#667085] " />
                      )}
                    </p>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="flex border border-border rounded-sm pr-3 w-full items-center flex-row">
                    <Input
                      {...field}
                      type={show ? "text" : "password"}
                      placeholder="Enter Password again"
                      name="password"
                      className="rounded-sm placeholder:text-sm placeholder:text-[#667085] outline-none focus:outline-none focus:border-none border-none focus:ring-0   focus-visible:ring-[0px] shadow-none  "
                    />

                    <p className="" onClick={() => setShowNew(!showNew)}>
                      {showNew ? (
                        <Eye className="font-extralight h-4 w-4 text-[#667085] " />
                      ) : (
                        <EyeOffIcon className="font-extralight h-4 w-4 text-[#667085] " />
                      )}
                    </p>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mt-4">Reset Password</Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
