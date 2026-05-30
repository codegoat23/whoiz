import React from 'react'
import { LuSparkle } from 'react-icons/lu'
function PortfolioSection() {
  return (
    <div className="flex flex-col items-center gap-3 mt-40 max-w-3xl">
        <span className="text-2xl text-white font-medium">Build a minimal</span>
        <div className="w-full h-px bg-gray-300"></div>
        <span className="text-[144px] text-white font-semibold">PORTFOLIO</span>
        <div className="w-full h-px bg-gray-300"></div>
        <div className="w-full  h-[362px] rounded-br-[362px] bg-[url('/vibrant.png')] bg-cover bg-center"></div>
        <div>
          <LuSparkle className="absolute right-70 -translate-y-25 text-purple-400 size-20" />
        </div>
        <div className="w-full flex justify-between text-gray-300 text-sm mt-10">
          <span>Delightful</span>
          <span>Elegant</span>
          <span>Simple</span>
        </div>
    </div>
  )
}

export default PortfolioSection