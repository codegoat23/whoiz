'use client'

import {createContext, useContext,useState, ReactNode } from "react";
import { Showcase } from "@/lib/type";

type AppContextType = {
    showcases:Showcase[];
    setShowcases:(showcases: Showcase[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({children} : {children : ReactNode}){
const[showcases,setShowcases ] = useState<Showcase[]>([]);
 
return(
    <AppContext.Provider value = {{showcases, setShowcases}}>
        {children}
    </AppContext.Provider>
);

}

export function useAppContext(){
    const ctx = useContext(AppContext);
    if(!ctx) throw new Error("UseAppContext must be used within App Provider ");
    return ctx;
}