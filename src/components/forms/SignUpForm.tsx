"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const FormSchema = z.object({
  email: z.string().min(6, {
    message: "Wrong or Invalid email address",
  }),
  password: z.string().refine((value) => passwordRegex.test(value), {
    message:
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and be at least 8 characters long",
  }),
  confirmPassword: z.string().min(8, {
    message: "Passwords must match",
  })
}).refine((data => data.password === data.confirmPassword), {
  message: "Passwords do not match",
  path: ['confirmPassword'],
});

export function SignUpForm({
  onChangeModal,
}: {
  onChangeModal: (modal: string) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Checking data for validity

    console.log("SignUp :: You submitted the following values:");
    console.log(JSON.stringify(data, null, 2));

    onChangeModal("signup-code");
  }

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full flex flex-col justify-between">
      <div className="space-y-6 flex flex-col justify-center h-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-white p-0.5">
                  Email
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="email" autoComplete="email" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-white p-0.5">
                  Password
                </FormLabel>
                <div className="flex justify-end">
                  <FormControl>
                    <Input placeholder="Create your password" type={showPassword ? "text" : "password"} autoComplete="new-password" {...field} />
                  </FormControl>
                  <Button
                    variant={"ghost"}
                    type="button"
                    className="absolute"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                  </Button>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-white p-0.5">
                  Confirm password
                </FormLabel>
                <div className="flex justify-end">
                  <FormControl>
                    <Input placeholder="Repeat your password" type={showConfirmPassword ? "text" : "password"} autoComplete="repeat-password" {...field} />
                  </FormControl>
                  <Button
                    variant={"ghost"}
                    type="button"
                    className="absolute"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
                  </Button>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </form>
    </Form>
  );
}
