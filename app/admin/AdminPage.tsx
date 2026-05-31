"use client"


import { auth } from "@/lib/auth";




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