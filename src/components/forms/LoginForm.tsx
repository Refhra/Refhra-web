"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Eye, EyeOffIcon } from "lucide-react";
import { Button } from "../ui/button";
import google from "@/components/icons/google.svg";
import Image from "next/image";
import Link from "next/link";
import { LoginSchema } from "@/schemas/auth";
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

const LoginForm = () => {
  const [show, setShow] = useState<boolean>(false);

  type LoginData = z.infer<typeof LoginSchema>;

  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-sm placeholder:text-sm placeholder:text-[#667085] shadow-none  "
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

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
            name="rememberMe"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center h-full justify-between flex-row">
                  <div className="flex-row items-center gap-1 flex">
                    <span className="">
                      <FormControl>
                        <Input
                          name="rememberMe"
                          className="remember text-sm"
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </span>
                    <span>
                      <FormLabel className="font-normal leading-[100%] text-sm">
                        Remember me
                      </FormLabel>
                    </span>
                  </div>

                  <Link
                    className="text-sm font-normal"
                    href="/auth/forgot-password"
                  >
                    {" "}
                    Forgot Password{" "}
                  </Link>
                </div>
              </FormItem>
            )}
          />
          <Button className="mt-4">Login</Button>
        </form>
      </Form>

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

export default LoginForm;
