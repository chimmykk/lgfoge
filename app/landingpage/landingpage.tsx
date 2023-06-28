import Image from "next/image"
import Link from "next/link"
import { signIn } from "next-auth/react"

export default function Homepage(){
    return(
        <main className=" bg-white min-h-screen">
             {/* first section */}
          <div className="px-4 sm:px-8 xl:px-32 pb-6 text-black pt-16 lg:pt-28 flex flex-col lg:flex-row justify-between 2xl:justify-around">
              <div className="w-full lg:w-1/2 py-6 lg:py-0 lg:h-[270px] text-left">
                <h1 className="text-[56px] sm:text-[65px] tracking-tighter font-neil leading-none">THE DOGEPOUND <br /> CONNECT</h1>
              </div>

              <div className="font-collector flex flex-col pb-6 md:pb-0 gap-[30px]">
                  <div className=" md:w-[465px] text-[15px]">
                    <p>CONNECT WITH OTHER DOGE POUND HOLDERS. VIEW AND ENGAGE WITH THE LATEST TWEETS FROM COMMUNITY MEMBERS.</p>
                  </div>
                  <div className="flex gap-[20px] sm:gap-[11px]">
                    <button onClick={() => signIn()} className="w-[162px] h-[48px] rounded-[1000px] border-[3px] border-black  text-white bg-bgPink shadow-btn"><p className="button_top">LOG IN</p></button>       
                    <button className="w-[162px] h-[48px] rounded-[1000px] border-[3px] border-black  text-white bg-bgOrange shadow-btn"><p  className="button_top">SIGN UP</p></button>       
                  </div>
              </div>
          </div>
          {/* second section */}
          <div>
            <div className="py-4 md:py-7 bg-bgBlue flex items-center">
              <h1 className="text-[35px] md:text-[65px] text-white md:tracking-tighter font-neil leading-none whitespace-nowrap">CONNECT CONNECT CONNECT CONNECT CONNECT CONNECT CONNECT</h1>
            </div>
            {/* connect with fellow doges */}
            <div className="flex flex-col lg:flex-row flex-wrap">
              <div className="bg-bgCyan px-4 sm:px-8 py-14 md:pt-24 w-full lg:w-1/2 flex flex-col gap-[30px]">
                <h1 className=" text-[55px] text-white tracking-tight font-neil leading-none">CONNECT WITH FELLOW DOGES</h1>
                <p className=" uppercase font-collector">let’s join paws and wag tails together, Our new platform is designed to showcase the best of the Doge community, featuring member spotlights, community news, and more. Whether you are a collector, an artist, or simply a fan of all things Doge POUND, we invite you to join our new platform.</p>
                <button className="w-[162px] h-[48px] rounded-[1000px] border-[3px] border-black font-collector  text-white bg-bgOrange shadow-btn"><Link href="/" className="button_top">SIGN UP</Link></button>       
              </div>
              <div className="lg:w-1/2 ">
                <Image src="/images/dogo.png" width={690} height={578} alt="AWOO" className="w-full h-full"/>
              </div>
            </div>
          </div>
        </main>
    )
}