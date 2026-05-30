'use client';

import { Button } from '@/components/ui/button'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar'
import { GalleryThumbnails, Home, Link2, Paintbrush, Smile } from 'lucide-react'
import Link from "next/link"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth-client';
import { toast } from 'sonner';

function Addsidebar() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('Home');

  return (
    <Sidebar className="flex flex-col h-full">
      
      <SidebarHeader className="flex justify-center items-center font-extrabold text-4xl">
        Whoiz
      </SidebarHeader>

      <SidebarContent className="flex-1">
        <Button variant="ghost" className="flex justify-start gap-5 w-full">
          <Link href='/admin' className='flex gap-5 w-full'>
            <Home /> Profile
          </Link>
        </Button>

        <Button variant="ghost" className="flex justify-start gap-5 w-full">
          <Link href='/admin/links' className='flex gap-5 w-full'>
            <Link2 /> Links
          </Link>
        </Button>

        <Button variant="ghost" className="flex justify-start gap-5 w-full">
          <Link href='/admin/products' className='flex gap-5 w-full'>
            <GalleryThumbnails /> Showcase
          </Link>
        </Button>

        <Button variant="ghost" className="flex justify-start gap-5 w-full">
          <Link href='/admin/connect' className='flex gap-5 w-full'>
            <Smile /> Connect
          </Link>
        </Button>

        <Button variant="ghost" className="flex justify-start gap-5 w-full">
          <Link href='/admin/themes' className='flex gap-5 w-full'>
            <Paintbrush /> Design
          </Link>
        </Button>
      </SidebarContent>

      <SidebarFooter className="mt-auto p-2">
        <Button
          onClick={async () => {
            await signOut();
            toast.success("Logged out");
            router.push("/auth");
          }}
          className="w-full bg-[#E83718] text-teal-50 hover:bg-[#E83718]/90 cursor-pointer"
        >
          Log out
        </Button>
      </SidebarFooter>

    </Sidebar>
  )
}

export default Addsidebar;