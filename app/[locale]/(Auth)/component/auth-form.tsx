import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@ulo/components/ui/button";
import { Input, Password } from "@ulo/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ulo/components/ui/form";
import React, { useTransition } from "react";
import { Icons } from "@ulo/components/customIcons";
import Link from "next/link";

const authFormSchema = z.object({
  email: z.string().email("This is not a valid email."),
  password: z.string(),
});

interface UserAuthFormProps {
  action?: any;
  isAuthType?: "LOGIN" | "REGISTER";
  isPending?: boolean;
}

type AuthFormValues = z.infer<typeof authFormSchema>;

function AuthForm({ action, isAuthType, isPending }: UserAuthFormProps) {
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    mode: "onChange",
  });

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="collins@example.com" {...field} />
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
              <div className="flex justify-between">
                <FormLabel>Password</FormLabel>
                {isAuthType === "LOGIN" && (
                  <Link
                    href={"/forgot-password"}
                    className="text-sm text-green-600"
                  >
                    Forgot Password ?
                  </Link>
                )}
              </div>

              <FormControl>
                <Password placeholder="*****" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {isAuthType === "LOGIN" ? "Sign in" : "Sign up"}
        </Button>
      </form>
    </Form>
  );
}

export default AuthForm;
