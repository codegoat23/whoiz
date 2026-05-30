import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { link } from 'fs'
import { Dot, Ellipsis } from 'lucide-react'
import Link from 'next/link'

import React from 'react'

function Myproducts() {
  return (
    <div className='w-[630px] h-full'>
      <Card className='h-full border-1 '>
        <CardHeader className='flex flex-row justify-between'>
            <CardTitle>My Products</CardTitle>
            <Button variant={'link'} className='font-light cursor-pointer'><Link href='/admin/products'>view All</Link></Button>
        </CardHeader>
        <CardContent>
            <Table>
  
  
  <TableBody>
    <TableRow className='rounded-2xl'>
      <TableCell className="font-medium w-0"><Button className='bg-[#FE482B] p-2 w-10'>PDF</Button></TableCell>
      
      <TableCell className='text-left flex flex-col'>
        <span>UI Design & System Mastery v.3</span>
        <span className='text-[10px] text-gray-400'>2.8MB</span>
      </TableCell>
      <TableCell className="text-right">
        <Button className='bg-transparent'><Ellipsis/></Button>
      </TableCell>
    </TableRow>
      <TableRow className='rounded-2xl'>
      <TableCell className="font-medium w-0"><Button className='bg-[#FE482B] p-2 w-10'>FIG</Button></TableCell>
      
      <TableCell className='text-left flex flex-col'>
        <span>UI Design & System Mastery v.3 - Figma file</span>
        <span className='text-[10px] text-gray-400'>3.6MB</span>
      </TableCell>
      <TableCell className="text-right">
        <Button className='bg-transparent'><Ellipsis/></Button>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
        </CardContent>

      </Card>
    </div>
  )
}

export default Myproducts
