import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInForm from "./form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignIn = () => {
  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-balance text-muted-foreground">
          Enter your information to signin
        </p>
      </div>
      <div className="grid gap-4">
        <SignInForm />
      </div>
      <div className="mt-2 text-center text-sm">
        New user?&nbsp;
        <Link href="/signup" className="underline">
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignIn;
