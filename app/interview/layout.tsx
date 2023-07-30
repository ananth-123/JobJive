import { notFound } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import SiteFooter from "@/components/site-footer"
import { UserAccountNav } from "@/components/user-account-nav"

interface InterviewLayoutProps {
  children?: React.ReactNode
}

export default async function InterviewLayout({
  children,
}: InterviewLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </header>
      {/* <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
</div> */}
      <main className="m-5 space-x-4 space-y-4">{children}</main>
    </div>
  )
}
