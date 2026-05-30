import { Globe } from 'lucide-react';
import React from 'react'

interface PreviewProps{
    username: string | undefined | null;
}

function Preview({username}: PreviewProps) {
  return (
    <div className='flex flex-col items-center  justify-center overflow-hidden'>
      <span className='border p-2 rounded-2xl text-[11px] flex flex-row justify-center items-center gap-2'><Globe className='text-green-400'/> Live Preview</span>
        <div className='relative w-[320px] h-[390px] overflow-hidden  shadow-2xl overflow-hidden flex flex-col justify-center items-center p-0 custom-scrollbar'>
          
              <iframe src={`http://localhost:3000/${username}`}
            title='phone preview'
            className='absolute  w-full h-full rounded-[40px] overflow-hidden '
            frameBorder='no'
            scrolling='no'
            ></iframe>
          
        </div>
      
    </div>
  )
}

export default Preview
