"use client"

import { SignIn, useSession } from "@clerk/nextjs"
import { redirect, useSearchParams } from "next/navigation"

export default function SignInPage() {
  const session = useSession()
  const searchParams = useSearchParams()
  const intent = searchParams.get("intent")

  if (session) redirect("/dashboard")

  return (
    <div className="w-full flex-1 flex items-center justify-center">
      <SignIn
        forceRedirectUrl={intent ? `/dashboard?intent=${intent}` : "/dashboard"}
      />
    </div>
  )
}
