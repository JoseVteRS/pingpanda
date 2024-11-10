import { DashboardPage } from "@/app/components/dashboard-page"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { UpgradePageContent } from "./upgrade-page-content"

export default async function AccountUpgradePage() {
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
    <DashboardPage title="Pro membership">
      <UpgradePageContent plan={user!.plan!} />
    </DashboardPage>
  )
}
