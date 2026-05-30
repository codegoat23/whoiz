'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { prisma } from '@/lib/prisma';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';

export default function OnboardingPage() {
 

 

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Set up your profile</h1>
      <Input
        type="text"
        placeholder="Choose a username"
       
        className="border p-2 rounded w-full"
      />
      <Label>what do you do?</Label>
      <Input
        type="text"
        placeholder="eg. Web Developer, Artist"
       
        className="border p-2 rounded w-full"
      />
      <button
       
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Continue
      </button>
    </div>
  );
}
