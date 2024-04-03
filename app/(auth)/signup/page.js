import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "./form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignUp = () => {
  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-balance text-muted-foreground">
          Enter your information to create an account
        </p>
      </div>
      <div className="grid gap-4">
        <SignUpForm />
      </div>
      <div className="mt-2 text-center text-sm">
        Already have an account?&nbsp;
        <Link href="/signin" className="underline">
          Sign In
        </Link>
      </div>
    </>
  );
};

export default SignUp;
