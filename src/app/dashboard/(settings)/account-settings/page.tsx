import { DashboardPage } from "@/app/components/dashboard-page"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { AccountSettings } from "./settings-page-content"

export default async function AccountSettingsPage() {
  const auth = await currentUser()
  if (!auth) {
    redirect("/sign-in")
  }

  const user = await db.user.findUnique({
    where: {
      externalId: auth.id,
    },
  })

  return (
    <DashboardPage title="Account settings">
      <AccountSettings discordId={user!.discordId!} />
    </DashboardPage>
  )
}
