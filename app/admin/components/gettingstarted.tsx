import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { X } from 'lucide-react'

import React from 'react'
interface GettingProps{
    closeTip: () => void
}
function Gettingstarted({closeTip}: GettingProps) {
  return (
    <div>
         <Card className="w-full h-45 border-none bg-[#F0F1F1] p-0">
            <CardHeader className='justify-end'>
                <button onClick={closeTip} className='cursor-pointer'>
                    <X/>
                </button>
            </CardHeader>
          <CardContent className="flex flex-row w-full h-22 justify-between">
            <Card className="w-[24%] border-none flex flex-row p-4 bg-[#1f2020]">
              <div className="w-14  flex justify-center items-center">
                <div className="size-12 rounded-[50%] bg-[#4342ff] flex justify-center items-center">
                  <span className="text-2xl">1</span>
                </div>
              </div>
              <div className=" w-30 flex flex-col">
                <span className="font-bold">New here</span>
                <span className="text-xs">Welcome  
setup your profile</span>
              </div>
            </Card>
             <Card className="w-[24%] border-none flex flex-row p-4 bg-[#1f2020]">
              <div className="w-14  flex justify-center items-center">
                <div className="size-12 rounded-[50%] bg-[#4342ff] flex justify-center items-center">
                  <span className="text-2xl">2</span>
                </div>
              </div>
              <div className=" w-30 flex flex-col">
                <span className="font-bold">Showtime</span>
                <span className="text-xs">Make your first 
product</span>
              </div>
            </Card>
             <Card className="w-[24%] border-none flex flex-row p-4 bg-[#1f2020]">
              <div className="w-14  flex justify-center items-center">
                <div className="size-12 rounded-[50%] bg-[#4342ff] flex justify-center items-center">
                  <span className="text-2xl">3</span>
                </div>
              </div>
              <div className=" w-30 flex flex-col">
                <span className="font-bold">Boom</span>
                <span className="text-xs">Make your First 
sales</span>
              </div>
            </Card>
             <Card className="w-[24%] border-none flex flex-row p-4 bg-[#1f2020]">
              <div className="w-14  flex justify-center items-center">
                <div className="size-12 rounded-[50%] bg-[#4342ff] flex justify-center items-center">
                  <span className="text-2xl">4</span>
                </div>
              </div>
              <div className=" w-35 flex flex-col">
                <span className="font-bold">Money-in</span>
                <span className="text-xs">Get your first 
payout</span>
              </div>
            </Card>
          </CardContent>
        </Card>
    </div>
  )
}

export default Gettingstarted
