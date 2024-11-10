"use client"
import { SignIn, SignUp } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="w-full flex-1 flex items-center justify-center">
      <SignUp fallbackRedirectUrl="/welcome" forceRedirectUrl="/welcome" />
    </div>
  )
}
