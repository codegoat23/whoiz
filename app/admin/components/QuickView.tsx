import { Card } from '@/components/ui/card'
import React from 'react'
import Myproducts from './Myproducts'
import ProfileCard from './ProfileCard'
interface QuickViewProps{
  fullname: string;
  bio: string | undefined | null;
  username:  string | undefined | null;
}
function QuickView({fullname, bio, username} : QuickViewProps) {
  return (
    <div>
     <Card className='w-full h-[75dvh] border-none  flex flex-row  items-center p-6 '>
        <Myproducts  />
        <ProfileCard fullname={fullname} bio={bio} />
     </Card>
    </div>
  )
}

export default QuickView
