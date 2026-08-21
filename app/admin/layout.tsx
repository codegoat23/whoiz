import { SidebarProvider } from "@/components/ui/sidebar"
import Addsidebar from "./components/add-sidebar"
import { SiteHeader } from "@/components/SiteHeader"
import { Toaster } from "@/components/ui/sonner"
import { getSessionUser } from "@/lib/session"
import { FloatingPreview } from "./components/FloatingPreview"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await getSessionUser();

  return (
    <SidebarProvider>
      <div className="flex min-h-dvh w-full bg-background">
        <Addsidebar />

        <div className="flex flex-1 flex-col min-w-0 md:peer-data-[variant=inset]:ml-0">
          <SiteHeader />

          <main className="flex-1 w-full overflow-x-hidden pb-16 sm:pb-0">
            {children}
          </main>
        </div>
      </div>
      <FloatingPreview />
      <Toaster />
    </SidebarProvider>
  )
}
