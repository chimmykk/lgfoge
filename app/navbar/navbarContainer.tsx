"use client"

import Navbar from "./navbar";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from 'next/image';


export function NavbarContainer(){

  const {data: session, status } = useSession();

    const pathname = usePathname()
 
      if (status === "loading") {
        return  <div className={`h-screen fixed z-50 top-0 w-screen bg-bgDark flex items-center justify-center`}>
                  <Image src="/images/dogieHead.svg" width={130} height={130} alt="Loading" />
                </div>
      }
    

    return(
        <Navbar bgColor={ pathname ==="/profiles" || session ? '#181826' : 'white'} textColor={pathname ==="/profiles" || session ? 'white' : 'black'} />      
    )
}