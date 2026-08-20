import { Card, CardContent } from '@/components/ui/card'
import { Quote, TextQuote } from 'lucide-react';
import React from 'react'

interface StoryProps{
    story: string | null; 
    
    txtcolor: string;
}
function Story({story,txtcolor}: StoryProps) {
  return (
   <Card className=' flex justify-center items-center  text-justify w-full max-w-[280px] text-[11px] p-0  font-light text-wrap backdrop-blur-2xl bg-left border-none'
    
   >
    <CardContent className='bg-black/50 w-full h-full rounded-[12px] p-6'>
    <Quote className='absolute top-0 left-0 size-10 rotate-180'/>
      <span className='p-6 text-sm'>{story}</span>
        <Quote className='absolute bottom-0 right-0 size-10 '/>

    </CardContent>
    
   </Card>
  )
}

export default Story
