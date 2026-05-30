import React from 'react'
import FloatingAvatars from './Heroavatar'
import { Card } from './ui/card'
import { Button } from './ui/button'

function Products() {
  return (
    <div className='w-full h-[120dvh] pb-6 lg:p-6 flex justify-center'>
        <div className='w-[90%] h-full bg-black rounded-4xl flex flex-col items-center p-6 gap-4'>
             <span className='text-white text-3xl font-extrabold'>Products</span>
            <div className='w-full h-dvh  flex flex-col md:flex-row lg:flex-row'>
                <div className='lg:w-1/3 md:w-1/3 w-full h-full p-6 flex  lg:items-start flex-col justify-center'>
                <span className='text-2xl'>Show the world what you've built. Your products deserve a spotlight.</span>
                <div className='p-6 lg:ml-17'>
                  <FloatingAvatars />
                </div>
                
                </div>
                <div className='p-6 flex-wrap flex flex-row gap-5 md:w-2/3 lg:w-2/3 w-full justify-center -mt-16'>
                   <Card className='w-40 h-60 rounded-2xl p-3 -rotate-3 border-none'>
                    <img src="/design.jpg" alt="" className=' h-42 rounded-2xl '/>
                    <div className='-mt-2 flex flex-row justify-between items-center'>
                      <span className='text-[10px]'>Styled package</span>
                      <Button className=' text-[11px] w-10 h-7 bg-[#05016b]'>view</Button>
                    </div>
                   </Card>
                    <Card className='w-40 h-60 rounded-2xl p-3 mt-10 rotate-6 border-none'>
                    <img src="/poster.jpg" alt="" className=' h-42 rounded-2xl '/>
                    <div className='-mt-2 flex flex-row justify-between items-center'>
                      <span className='text-[10px]'>Posters</span>
                      <Button className=' text-[11px] w-10 h-7 bg-[#1b89e3]'>view</Button>
                    </div>
                   </Card>
                    <Card className='w-40 h-60 rounded-2xl p-3 border-none hidden lg:block'>
                    <img src="/recipe.jpg" alt="" className=' h-42 rounded-2xl '/>
                    <div className='-mt-2 flex flex-row justify-between items-center'>
                      <span className='text-[10px]'>Food recipes</span>
                      <Button className=' text-[11px] w-10 h-7'>view</Button>
                    </div>
                   </Card>
                    <Card className='w-40 h-60 rounded-2xl p-3 -mt-8 border-none hidden lg:block'>
                    <img src="/webtemp.jpg" alt="" className=' h-42 rounded-2xl object-cover '/>
                    <div className='-mt-2 flex flex-row justify-between items-center'>
                      <span className='text-[10px]'>Web templates</span>
                      <Button className=' text-[11px] w-10 h-7 bg-amber-300'>view</Button>
                    </div>
                   </Card>
                    <Card className='w-40 h-60 rounded-2xl p-3 border-none hidden lg:block'>
                    <img src="/content.jpg" alt="" className=' h-42 rounded-2xl '/>
                    <div className='-mt-2 flex flex-row justify-between items-center'>
                      <span className='text-[10px]'>Content</span>
                      <Button className=' text-[11px] w-10 h-7 bg-[#0a081c]'>view</Button>
                    </div>
                   </Card>
                    <Card className='w-40 h-60 rounded-2xl p-3 -mt-10 -rotate-6 border-none hidden lg:block'>
                    <img src="/ray.jpg" alt="" className=' h-42 rounded-2xl '/>
                    <div className='-mt-2 flex flex-row justify-between items-center'>
                      <span className='text-[10px]'>Photography</span>
                      <Button className=' text-[11px] w-10 h-7'>view</Button>
                    </div>
                   </Card>
                </div>
            </div>
        </div>
     
    </div>
  )
}

export default Products
