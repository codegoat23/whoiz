import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { SidebarContent, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Sidebar } from "@/components/ui/sidebar"
import { BarChart, DollarSign, File, GitGraph, Home, Link, PencilRuler, RulerDimensionLine } from "lucide-react"
import Addsidebar from "./components/add-sidebar"
import AddBreadcrumb from "./components/AddBreadcrumb";
import { Toaster } from "@/components/ui/sonner"
import LogDisplay from "./components/LogDisplay"
import { getSessionUser } from "@/lib/session"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await getSessionUser();

  return (
    <SidebarProvider>
      <div className="flex w-full h-full">
          <Addsidebar/>

        <main className="flex-1 p-2 h-130 w-full ">
          <div className="flex flex-row items-center justify-between">
            <SidebarTrigger/>
           
            
          </div>
       
         
          <div className="flex w-full  justify-center h-full">
           
              
                {children}
             
              

         
          </div>
          
          
        </main>
       
      </div>
    </SidebarProvider>
  )
}
