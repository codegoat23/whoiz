'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { signOut } from '@/lib/actions/auth-actions/auth-actions'
import { Ellipsis, Lightbulb, LogOutIcon, PersonStanding, Settings, Share2Icon, Sun } from 'lucide-react'
import { useRouter } from 'next/navigation'

import React, { Profiler } from 'react'
import { toast } from 'sonner'

function LogDisplay({
  avatarUrl,
}: {
  avatarUrl?: string | null;
}) {
     const router = useRouter();
        const handleSignout = async () => {
    // 1️⃣ Create a real promise from signOut
    const logoutPromise = signOut();

    // 2️⃣ Use that promise in the toast
    toast.promise(logoutPromise, {
      loading: "Signing out...",
      success: "You’ve been logged out 👋",
      error: "Failed to sign out",
    });

    // 3️⃣ Wait for it to finish → redirect
    logoutPromise.then(() => {
      router.push("/auth/login");
    });
  };
  return (
    <div className='mr-5 flex flex-row justify-center items-center'>
        <Button className='bg-transparent'><Sun className='size-4.5'/></Button>
           <Popover>
  <PopoverTrigger>
     <Avatar className='size-10 cursor-pointer'>
                    <AvatarImage src="/profile.jpg" className='object-cover' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
  </PopoverTrigger>
  <PopoverContent className='mr-3 w-40 p-2 h-auto'>
   <Card className='w-full  border-none flex flex-col gap-2'>
        
        <Button variant={'ghost'} className='justify-start flex flex-row p-0'><PersonStanding/>Account</Button>
        <Button variant={'ghost'} className='justify-start flex flex-row p-0'><Share2Icon/>Share</Button>
        <Button variant={'ghost'}className='justify-start flex flex-row p-0'><Settings/>settings</Button>
        <Button variant={'ghost'} onClick={handleSignout} className='justify-start flex flex-row p-0 bg-[#ff5e47] text-white hover:bg-[#e5e7eb]'><LogOutIcon/>Logout</Button>
   </Card>
  </PopoverContent>
</Popover>
    </div>
  )
}

export default LogDisplay
