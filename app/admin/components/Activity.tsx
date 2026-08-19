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
  const { showcases } = useAppContext();

  return (
    <div>
      <Card className="w-full border border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader className="flex flex-row justify-between">
          <span className="text-2xl">Activity</span>
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
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card className="flex flex-col gap-2 p-4 border border-white/10 bg-white/5">
              <span className="text-xs text-white/60">Total clicks</span>
              <span className="text-[#FE482B] font-bold text-2xl sm:text-[30px]">0</span>
            </Card>
            <Card className="flex flex-col gap-2 p-4 border border-white/10 bg-white/5">
              <span className="text-xs text-white/60">Total Showcases</span>
              <span className="text-[#FE482B] font-bold text-2xl sm:text-[30px]">{showcases.length}</span>
            </Card>
            <Card className="flex flex-col gap-2 p-4 border border-white/10 bg-white/5">
              <span className="text-xs text-white/60">Earnings</span>
              <span className="text-[#FE482B] font-bold text-2xl sm:text-[30px]">$0</span>
            </Card>
            <Card className="flex flex-col gap-2 p-4 border border-white/10 bg-white/5">
              <span className="text-xs text-white/60">Balance</span>
              <span className="text-[#FE482B] font-bold text-2xl sm:text-[30px]">$0</span>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Activity
