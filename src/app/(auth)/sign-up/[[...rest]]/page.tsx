"use client"
import { SignIn, SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="w-full flex-1 flex items-center justify-center">
      <SignUp />
    </div>
  );
}