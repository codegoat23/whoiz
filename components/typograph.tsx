import React from 'react'
import { cn } from "@/lib/utils"
import { Link, Link2 } from 'lucide-react'

function Typograph() {
  return (
    <div className='text-wrap w-full flex justify-center mt-12 p-6.5 -space-y-10'>
      <span className='lg:text-[100px] font-bold text-5xl'><span 
       className="text-[#FF5E57]"
      >Whoiz</span> isn't just a place to dumb links. It's where your <span className='bg-purple-500 lg:p-7  rounded-full p-2'>identity</span> lives</span>
    </div>
  )
}

export default Typograph
