"use client";
import { Input } from "../ui/input";
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
import { forgotPassowrdSchema } from "@/schemas/auth";

const ForgotPasswordForm = () => {
  type signupData = z.infer<typeof forgotPassowrdSchema>;

  const form = useForm<signupData>({
    resolver: zodResolver(forgotPassowrdSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = (values: signupData) => {
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
                    placeholder="janedoe@gmail.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mt-4">Sign up</Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
