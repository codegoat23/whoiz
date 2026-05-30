
import React from 'react'

import { Card } from './ui/card'
import { Button } from './ui/button'
import { Brush, Cloud, Dot, Gamepad, PersonStanding, PointerOffIcon, Presentation } from 'lucide-react'

function Cardcoursel() {
    const imageurl = '/toa.jpg'
  return (
    <div className='flex flex-row '>
      <Card className='w-50 h-50 rounded-3xl border-none -rotate-10 bg-cover py-2 flex items-center transition-all duration-500 hover:-translate-y-1'
      style={{
        backgroundImage:` url(/toa.jpg)`
      }}
      >
        <Button className='w-1/2 h-8 rounded-3xl bg-black/50'>
            <Cloud/>
            <span>Lily</span>
        </Button>
      </Card>
      <Card className='w-50 h-50 rounded-3xl -mt-10 bg-cover border-none flex items-center py-2'
       style={{
        backgroundImage:` url(/ray.jpg)`
      }}
      >
              <Button className='w-1/2 h-8 rounded-3xl bg-black/50'>
            <Gamepad/>
            <span>Jack</span>
        </Button>
      </Card>
      <Card className='w-50 h-50 rounded-3xl rotate-10 bg-cover border-none flex items-center py-2'
       style={{
        backgroundImage:` url(/stefan.jpg)`
      }}
      >
              <Button className='w-1/2 h-8 rounded-3xl bg-black/50'>
            <Brush/>
            <span>Wendy</span>
        </Button>
      </Card>
    </div>
  )
}

export default Cardcoursel
