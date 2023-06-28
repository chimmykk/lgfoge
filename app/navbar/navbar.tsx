"use client"

import { GetServerSidePropsContext } from 'next';
import Image from "next/image"
import Link from "next/link"
import {usePathname} from "next/navigation"
import { useState, useEffect } from "react"
import { HiMenuAlt3 } from "react-icons/hi"
import { MdClose } from "react-icons/md"
import { signIn, signOut, useSession } from "next-auth/react";
import Search from '../search/Search';
import { IoIosSearch } from "react-icons/io"



interface bgColorProp{
    bgColor: string,
    textColor: string
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const pathname  = context.req.url;
  
    return {
      props: {
        activePage: pathname,
      },
    };
  }

export default function Navbar({bgColor, textColor}: bgColorProp){


    const { data: session, status } = useSession();

    const pathname = usePathname()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    const [showMenu, setShowMenu] = useState(false)

    

    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

      useEffect(() => {
        if (pathname === '/') {
          setActiveLink('home');
        } else if (pathname === '/tweets') {
          setActiveLink('tweets');
        } else if (pathname === '/profiles') {
          setActiveLink('profiles');
        }
      }, [pathname]);

    return(
        
        <nav style={{backgroundColor: bgColor, color: textColor}} className={' '}>
           <div className="px-4 sm:px-8 xl:px-32  flex justify-between items-center py-5 ">
                <div>
                        <Link href="/"><Image src="/images/dogieLogo.svg" width={175} alt="dogieLOGO" height={61} /></Link>
                    </div>
                    <div className="hidden lg:flex gap-7 items-center text-base font-collector">
                        <div className="cta"><Link href="/" className={`hover-underline-animation ${activeLink === 'home' ? 'active-pink' : ''}`}  onClick={() => setActiveLink('home')}>HOME</Link></div>
                        <div className="cta"><Link href="/profiles" className={`hover-underline-animation ${activeLink === 'profiles' ? 'active-pink' : ''}`} >PROFILES</Link></div>             
                        {session && session.user && (
                          <div className='flex items-center gap-2'>
                                <button className={`w-[200px] bg-bgDarkLint py-2 rounded-[1000px] border border-darkBorder hover:border-[#FFA5BD] font-inter text-left pl-5 text-[#808095] text-[14px]
                                `} onClick={toggleModal}>
                                  Start searching...
                                </button>                              
                                <div className="relative">
                                <Image src={session.user.image || ''} width={40} height={40} alt='image' onClick={() => setShowMenu(!showMenu)} className=' rounded-[1000px] cursor-pointer text-[30px]'/>                                
                                {showMenu && (
                                  <div className="absolute top-[120%] w-[100px] py-2 right-0 text-black bg-white rounded-md shadow-md">
                                    <button onClick={() => signOut()} className="  px-2  block w-full text-left hover:text-bgPink focus:outline-none focus:bg-gray-100">
                                      log Out
                                    </button>
                                  </div>
                                )}
                              </div>
                          </div>
                          
                        )} 
                        { !session && (
                          <button onClick={() => signIn()} className=" w-[162px] h-[48px] rounded-[1000px] border-[3px] border-black text-white bg-bgPink shadow-btn">
                            <p className='button_top '>LOG IN</p>
                          </button>
                        )}
                    </div>
                    <IoIosSearch  
                      className={`ml-20 sm:ml-60 md:ml-96 w-8 h-8 ${session ? 'block' : 'hidden'} lg:hidden text-[#808095]`} 
                      onClick={toggleModal}
                    />
                      
                        
                    {session ? <Image src={session?.user?.image || ''} width={40} height={40} alt='image' 
                      onClick={() => {setShowMenu(!showMenu);setToggleMenu(!toggleMenu);}} className=' lg:hidden rounded-[1000px] cursor-pointer text-[30px]'/>
                     : 
                     <HiMenuAlt3 className=" text-bgPink w-[45px] h-[45px] lg:hidden " onClick={() => setToggleMenu(!toggleMenu)}/>
                    }  

                    {isModalOpen &&
                        <Search setIsModalOpen={setIsModalOpen}/>
                    }
           </div>
             {
             toggleMenu && 
             <div  className= {` flex lg:hidden fixed top-0 w-screen  border font-collector bg-bgDark z-50`}>
                <div className={`w-full min-h-screen pb-10 flex flex-col gap-5  ${session ? ' bg-bgDark' : ' bg-white'}`}>
                        <div className="flex  items-center justify-between py-10 px-16">
                            <Link  href="/"><Image src="/images/dogieLogo.svg" width={175} alt="dogieLOGO" height={61}  onClick={() => setToggleMenu(!toggleMenu)}/></Link>
                            <MdClose onClick={() => setToggleMenu(!toggleMenu)} className="text-[40px] text-bgPink"/>
                        </div>
                        <div className={` w-full ${session ? ' text-white' : ' text-black'} text-black flex flex-col items-center gap-5 text-[20px] `}>
                       
                        <Link  
                            onClick={() => {
                                setActiveLink('home');
                                setToggleMenu(false);
                            }}
                            className={`flex flex-row hover:text-bgPink ${activeLink === 'home' ? 'active-pink' : ''}`} 
                            href="/"
                            >
                                <p>HOME</p> 
                        </Link>
                        <Link  
                            onClick={() => {
                                setActiveLink('profiles');
                                setToggleMenu(false);
                            }} 
                            className={`flex flex-row hover:text-bgPink ${activeLink === 'profiles' ? 'active-pink' : ''}`} 
                            href="/profiles">
                                <p>PROFILEs</p> 
                        </Link>
                        {session ? <button onClick={() => signOut()} className="w-[162px] h-[48px] rounded-[1000px] border-[3px] border-black text-base  text-white bg-bgPink shadow-btn">LOG OUT</button> :<button onClick={() => signIn()} className="w-[162px] h-[48px] rounded-[1000px] border-[3px] border-black text-base  text-white bg-bgPink shadow-btn">LOG IN</button>
}
                        </div>
                </div>
            </div>
            }
                
        </nav>
    )
}