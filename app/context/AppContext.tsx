'use client'

import {createContext, useContext,useState, ReactNode } from "react";
import { Product } from "@/lib/type";

type AppContextType = {
    product:Product[];
    setProduct:(product: Product[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({children} : {children : ReactNode}){
const[product,setProduct ] = useState<Product[]>([]);
 
return(
    <AppContext.Provider value = {{product, setProduct}}>
        {children}
    </AppContext.Provider>
);

}

export function useAppContext(){
    const ctx = useContext(AppContext);
    if(!ctx) throw new Error("UseAppContext must be used within App Provider ");
    return ctx;
}