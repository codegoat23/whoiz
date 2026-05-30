"use client"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
 import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from 'react'
import { usePathname } from "next/navigation"


function AddBreadcrumb() {
    const pathname = usePathname();

    const segments = pathname.split("/").filter(Boolean)
    const parts = segments.slice(1)
    
    const formatcrumb = (text: string) =>
        text
            .replace(/-/g, "")
            .replace(/\b\w/g, (l) => l.toUpperCase());
            console.log(parts)
  return (
    <div>
     


        

    <Breadcrumb className="flex flex-row ">
      
        {parts.map((part, i) =>(
            
            <BreadcrumbList className="flex" key={i}>
            {i === parts.length - 1 ? (
                 <BreadcrumbItem>
          <BreadcrumbLink>
            <BreadcrumbPage>{formatcrumb(part)}</BreadcrumbPage>
          </BreadcrumbLink>
          
        </BreadcrumbItem>
            ) : (
                 <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href='/admin/${parts.slice(0, i +1).join("/")}'>{formatcrumb(part)}</Link>

          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
            )}
            </BreadcrumbList>
        ))}
       
    
    </Breadcrumb>


    </div>
  )
}

export default AddBreadcrumb
