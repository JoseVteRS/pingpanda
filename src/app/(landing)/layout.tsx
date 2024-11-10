import { Navbar } from "@/app/components/navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar /> {children}
    </>
  )
}
