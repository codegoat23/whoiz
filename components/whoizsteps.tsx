import React from 'react'
import { Button } from './ui/button'
import { cn } from "@/lib/utils"
import { Permanent_Marker } from "next/font/google"
import { Card, CardDescription, CardFooter, CardHeader } from './ui/card'
import { Dribbble, Facebook, Instagram, Linkedin } from 'lucide-react'

const permanentMarker = Permanent_Marker({
weight: "400",
subsets: ["latin"],
})

function Steps() {
  return (
    <div  className='p-7 mt-12 '>
      <div className='flex flex-row w-full lg:w-11/12 h-120'>
        <div className='flex justify-center items-center w-full lg:w-11/12 h-full hidden sm:block'>
            <Button 
            
             className={cn(
                  permanentMarker.className,
                  "w-35 h-35 bg-[#ff5e47] rounded-full text-5xl -rotate-20"
                  
                  )}> signup</Button>
        </div>
        <div className='flex flex-col lg:w-1/2 gap-5 w-full'>
                <Card className='w-full h-2/5 border-none bg-[#ff5e47] flex flex-row p-6 rounded-3xl'>
                <div className='w-10 h-full flex justify-center'><div className='bg-black p-2 rounded-full w-8 h-8 flex items-center justify-center mt-1.5'><span > 1</span></div></div>
                <div className='w-70  h-full p-0 flex flex-col justify-between'>
                    <span className='text-2xl lg:text-4xl font-bold'>Create your own whoiz</span>
                    <span className='font-light'>It's easy as pie!</span>
                </div>
                <div className='w-50 h-full '>
                  <img src="/bro.png" alt=""  className='-mt-2.5'/>
                </div>
                </Card>
                <Card className="w-full h-2/5 flex flex-row p-6 bg-cover rounded-3xl"
                 style={{
        backgroundImage:` url(/jema.jpg)`
      }}
                >
                       <div className='w-10 h-full flex justify-center'><div className='bg-black p-2 rounded-full w-8 h-8 flex items-center justify-center mt-1.5'><span > 2</span></div></div>
                <div className='w-70  h-full p-0 flex flex-col justify-between'>
                    <span className='text-3xl lg:text-4xl font-bold text-[#ff5e47]'>Take a relaxed posture</span>
                    <span className='font-light text-[#ff5e47]'>Tell us who you are!</span>
                </div>
                

                </Card>
        </div>

      </div>
      <div className='w-full lg:w-11/12 h-75  flex flex-row -mt-15 '>
      <div className='w-[65%] h-full  flex p-6 items-end hidden sm:block'>
        <Card className='w-full h-3/4  border rounded-3xl bg-cover'
         style={{
        backgroundImage:` url(/prod.webp)`
      }}
        >

        </Card>

      </div>
       <div className='w-full lg:w-[35%] h-full'>
        <Card className='w-full h-full border rounded-3xl'>
          <CardHeader>
            <CardHeader className='text-white/50 text-[11px]'>ABOUT</CardHeader>
            <CardDescription className='p-6 text-2xl font-bold text-white'>Complete <br/>your profile add your <br/> social links.</CardDescription>
          </CardHeader>
          <CardFooter className='p-6 -mt-7'>
            <div className='flex flex-row gap-1.5'>
               <Instagram/>
            <Facebook/>
            <Dribbble/>
            <Linkedin/>
            </div>
            
           
          </CardFooter>

        </Card>

       </div>
      <div>

      </div>
      </div>
    </div>
  )
}

export default Steps
