import { db } from "@/db"
import { auth, currentUser } from "@clerk/nextjs/server"
import { router } from "../__internals/router"
import { privateProcedure, publicProcedure } from "../procedures"

export const authRouter = router({
  getDatabaseSyncStatus: publicProcedure.query(async ({ c, ctx }) => {

    console.log("API ROUTE")

    const auth = await currentUser()

    if (!auth) {
      return c.json({ isSynced: false })
    }

    const user = await db.user.findFirst({
      where: { externalId: auth.id },
    })

    console.log("USER IN DB:", user)

    if (!user) {
      await db.user.create({
        data: {
          quotaLimit: 100,
          externalId: auth.id,
          email: auth.emailAddresses[0].emailAddress,
        },
      })
    }

    return c.json({ isSynced: true })
  }),
})
