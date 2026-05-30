'use client'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { Router } from 'next/router'

import React, { useState } from 'react'

import { toast } from 'sonner'

function Test() {
  const router = useRouter()
  const[email,setEmail] = useState("");
  const[Message,setMessage] = useState('')
  const [content,setContent] = useState("");
  const [loading,setLoading] = useState(false);
  const sendFeedBack = async  () => {
   try{
    
    setLoading(true);
   const res = await fetch ('/api/test',{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({email, content})
    })
   if (!res.ok){
    throw new Error('failed')
   }
   router.push('/test/success')
    
   }catch(error){
    toast.error("Failed to send feedback ❌")

   }finally{
    setLoading(false);
    
   
   }
    
  }
  return (
    <div className='flex justify-center items-center flex-col p-6'>
      <span className='font-extrabold text-3xl'>Feed<span className='text-amber-300'>Grap</span></span>
      <form className='w-full flex justify-center p-6'>
           <Card className='w-1/3 p-6'>
      
     
          <Label>Email</Label>
          <Input 
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='feed@grap.me'
          ></Input>
          <Label>Message</Label>
          <Textarea 
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder='share your feedback'
          
          ></Textarea>
          <div className='w-full flex flex-row justify-center gap-3'>
            <Button className='rounded-full w-11 h-11 text-xl cursor-pointer'>😟</Button>
            <Button className='rounded-full w-11 h-11 text-xl cursor-pointer'>😥</Button>
            <Button className='rounded-full w-11 h-11 text-xl cursor-pointer'>😎</Button>
            <Button className='rounded-full w-11 h-11 text-xl cursor-pointer'>💪🏿</Button>
            <Button className='rounded-full w-11 h-11 text-xl cursor-pointer'>😀</Button>
            <Button className='rounded-full w-11 h-11 text-xl cursor-pointer'>🤩</Button>
          </div>
          <Button  onClick={sendFeedBack} disabled={loading}>
            {loading ? "Sending......":
             "Send this feedback"
             }


          </Button>

     
      </Card>
      </form>
   

    </div>
  )
}

export default Test
