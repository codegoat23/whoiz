import React from 'react'

function Dynamicstyle() {
  return (
    <div className="flex flex-col items-center gap-10 mt-40 max-w-3xl">
        <span className="text-7xl text-white font-medium text-center">Dynamic Styling:<br/> Theme Selection</span>
       
        <span className="text-sm text-white font-medium text-center">Customize portfolio card into style you want .<br/>
Also  you can add custom images to beautify your portfolio </span>
    <div className="flex flex-row w-full gap-5">
<div className="w-[250px] h-[250px]  rounded-4xl translate-y-15 bg-[url('/themes/3.webp')] bg-cover bg-center border-2 border-white"></div>
<div className="w-[250px] h-[250px]  rounded-4xl bg-[url('/themes/titaniumBlack.webp')] bg-cover bg-center border-2 border-white"></div>
<div className="w-[250px] h-[250px]  rounded-4xl translate-y-15 bg-[url('/themes/orange.webp')] bg-cover bg-center border-2 border-white"></div>
    </div>
    <div className='bg-[#FF5E57] p-4 rounded-4xl text-xs font-medium'>
      <span>Pick a theme</span>
    </div>
    </div>
  )
}

export default Dynamicstyle