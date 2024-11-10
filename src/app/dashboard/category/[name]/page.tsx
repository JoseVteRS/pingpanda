import { DashboardPage } from "@/app/components/dashboard-page"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import { CategoryPageContent } from "./category-page-content"

interface DashboardCategoryNamePageProps {
  params: {
    name: string | string[] | undefined
  }
}

export default async function DashboardCategoryNamePage({
  params,
}: DashboardCategoryNamePageProps) {
  if (typeof params.name !== "string") notFound()

  const auth = await currentUser()
  if (!auth) notFound()

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })
  if (!user) notFound()

  const category = await db.eventCategory.findUnique({
    where: {
      name_userId: {
        name: params.name,
        userId: user.id,
      },
    },
    include: {
      _count: {
        select: {
          events: true,
        },
      },
    },
  })
  if (!category) notFound()

  const hasEvents = category._count.events > 0

  return (
    <DashboardPage title={`${category.emoji} ${category.name} events`}>
      <CategoryPageContent hasEvents={hasEvents} category={category} />
    </DashboardPage>
  )
}
