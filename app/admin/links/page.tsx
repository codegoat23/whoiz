import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'
import LinkEditor from '../components/LinkEditor';

async function links() {
    
    
  return <LinkEditor/>
}

export default links
