import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Products from "./ProductsPage";


export default async function Admin() {
 

  
  return <Products />;
}
