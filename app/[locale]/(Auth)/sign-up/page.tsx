"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@ulo/components/ui/alert";
import { AlertCircle } from "lucide-react";
import AuthForm from "../component/auth-form";
function Page() {
  const [error, setError] = useState("");
  return (
    <>
      <header className="w-full absolute left-0 right-0">
        <div className="p-8 font-bold">N</div>
      </header>

      <div className="container relative  min-h-screen flex items-center justify-center  lg:px-0">
        <div className="lg:p-8">
          {!!error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below to create your account
              </p>
            </div>
            {<AuthForm isAuthType="REGISTER" />}
            <p>
              Already have an account?{" "}
              <Link href="/sign-in" className="text-green-600">
                Sign in.
              </Link>
            </p>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
