"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Sidebar } from "@/components/ui/sidebar";
import Gettingstarted from "./components/gettingstarted";
import Activity from "./components/Activity";
import { useState } from "react";

import { auth } from "@/lib/auth";
import Preview from "./components/Preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Spotify from "./components/Spotify";
import ProfileCard from "./components/ProfileCard";

type Session = typeof auth.$Infer.Session;


export default function AdminPage({session}: {session: Session}) {
  const user = session.user;

    return (
      <div className="w-full h-full flex  justify-center pt-6 lg:p-6 ">
        <div className="w-2/3 h-full  flex justify-center pt-6 lg:p-6 ">
            <ProfileCard fullname={user.name} bio={user.bio} id={user.id} avatarUrl={user.avatarUrl}/>
        </div>
      
        
        
        
      </div>
    );
  }