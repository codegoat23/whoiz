import { useAppContext } from '@/app/context/AppContext'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React from 'react'




function Activity() {
  const{product} = useAppContext();
    
  return (
    <div>
      <Card className='w-full  h-60 border-none '>
        <CardHeader className='flex flex-row justify-between'>
           
                <span className='text-2xl'>Activity</span>
                <Select>
                    <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="This month" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Last 7 days</SelectItem>
                        <SelectItem value="dark">Yearly</SelectItem>
                        <SelectItem value="system">This Month</SelectItem>
                    </SelectContent>
                </Select>
        </CardHeader>
        <CardContent className='flex flex-row justify-between bg-transparent'>
            <Card className=' w-[24%] h-25 flex flex-col gap-2 p-4 border-1'>
                <span>Total clicks</span>
                <span className='text-[#FE482B] font-bold text-[30px] mb-4'>0</span>
                
            </Card>
             <Card className=' w-[24%] h-25 flex flex-col gap-2 p-4 border-1'>
                  <span>Total Products</span>
                 <span className='text-[#FE482B] font-bold text-[30px]'>{product.length }</span>
                
             </Card>
              <Card className=' w-[24%] h-25 flex flex-col gap-2 p-4 border-1'>
                <span>Earnings</span>
                <span className='text-[#FE482B] font-bold text-[30px]'>$0</span>
                
              </Card>
               <Card className=' w-[24%] h-25 flex flex-col gap-2 p-4 border-1'>
                <span>Balance</span>
                <span className='text-[#FE482B] font-bold text-[30px]'>$0</span>
                
               </Card>
        </CardContent>
      </Card>
    </div>
  )
}

export default Activity
