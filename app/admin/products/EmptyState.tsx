import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
 interface EmptyStateProps {
    message: string,
    ButtonText: string
    

 }

function EmptyState({message,ButtonText} : EmptyStateProps) {
  return (
    <div className='flex flex-col justify-center items-center w-full h-[65dvh] gap-8 '>
      <span className='font-light text-muted-foreground'>{message}</span>
      <Button>
        <Plus/>
        <Link href={'/admin/products/add-product'}>{ButtonText}</Link>
        
        </Button>
    </div>
  )
}

export default EmptyState
