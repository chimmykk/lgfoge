"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import cvjson from "../csvjson.json"

type ProfileType = {
   "relative href": string;
   "rounded-full src": string;
   "text-sm": string | number;
   "text-sm 2": string;
   "text-sm 3": string;
   "inline-flex": string;
 };
 
 

export default function Profile(){

   const [activeFilter, setActiveFilter] = useState("pfp")

   const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(48);

  const [searchTerm, setSearchTerm] = useState("");

  const [filteredItems, setFilteredItems] = useState<Array<ProfileType>>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
   const searchTerm = e.target.value;
   setSearchTerm(searchTerm);
 
   const filtered: ProfileType[] = cvjson.filter((profile) => {
      const textSm = (profile as ProfileType)["text-sm"];
      if (typeof textSm === "string") {
        return textSm.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });
   setFilteredItems(filtered);
 };
 


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchTerm ? filteredItems : cvjson.slice(indexOfFirstItem, indexOfLastItem);
    return(
       <div className=" min-h-screen bg-bgDark">
            <div className="px-4 sm:px-8 xl:px-12 py-10  text-white">
               <div className="flex flex-col gap-4 lg:flex-row font-inter lg:justify-between">
                  {/* search profiles */}
                  <div className="flex gap-3 items-center">
                        <div className="w-full border border-darkBorder rounded-lg">
                        <input
                           type="text"
                           placeholder="Search profiles..."
                           value={searchTerm}
                           onChange={handleSearch}
                           className="w-[304px] h-[40px] focus-within:outline-none rounded-lg bg-[#1A1A26] px-4 py-2 sm:text-[16px] placeholder-[#808095]"
                        />
                        </div>
                        <button className="bg-[#393954] text-[14px] xl:text-[16px] py-2 px-12 bg-opacity-90 hover:bg-opacity-100  border-darkBorder rounded-lg font-semibold">Search</button>
                  </div>

                  {/* Filter */}
                  <div className="flex gap-4 sm:gap-6 text-[12px] sm:text-[14px] xl:text-[16px] font-semibold">
                     <div className="bg-[#212134] cursor-default bg-opacity-75 hover:bg-opacity-100 border text-textGray border-darkBorder rounded-lg px-4 py-2">
                        Followed by community
                     </div>
                     <div className=" rounded-lg w-fit items-center border bg-[#212134] border-darkBorder">
                        <button className={`py-2 px-4 h-[40px] rounded-l-lg ${activeFilter === "pfp" ? "bg-bgPink text-white" : "text-textGray bg-opacity-75 hover:bg-opacity-100"}`} onClick={() => setActiveFilter("pfp")}>
                           PFP ONLY
                        </button>
                        <button className={`py-2 px-4 rounded-r-lg  ${activeFilter === "verified" ? "bg-bgPink text-white" : "text-textGray bg-opacity-75 hover:bg-opacity-100"}`} onClick={() => setActiveFilter("verified")}>
                           VERIFIED HOLDER
                        </button>
                     </div>     
                  </div> 
               </div>
               {/* profiles grid */}
                  <div className=" grid grid-cols-fluid gap-3 mt-4">
                     {currentItems.map((profile, index) => (
                        <div  key={index}>
                              <div className=" h-[140px]  flex justify-between items-center font-inter border border-darkBorder rounded-lg relative px-4 bg-[#212134] bg-opacity-75 hover:bg-opacity-100">
                                 <div className="w-8 h-5 rounded-lg flex items-center justify-center bg-[#393954] absolute top-8 left-2 text-white text-xs font-inter">
                                    {profile["inline-flex"]}
                                 </div>
                                 <div className=" flex gap-2 items-center">
                                    <div>
                                       <Image src={profile["rounded-full src"]} width={65} height={65} alt="pfp" className="rounded-full"/>
                                    </div>
                                    <div className="flex flex-col justify-start">
                                       <h1 className="font-bold text-[16px]">{profile["text-sm"]}</h1>
                                       <Link target="_blank" href={profile["relative href"]} className="text-bgPink text-[14px]">{profile["text-sm 2"]}</Link>
                                       <p className="text-white bg-[#393954] text-xs rounded-md mt-1 py-2 px-4 w-fit">{profile["text-sm 3"]}</p>
                                    </div>
                                 </div>
                              </div>
                        </div>
                     ))}
                  </div>

      <div className="flex justify-center gap-4 mt-4">
         {currentPage > 1 && (
         <button
         className="py-3 bg-[#393954] w-[93px] rounded-md"
          onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
         )}
         {indexOfLastItem < cvjson.length && (
         <button 
         className="bg-[#393954] py-3 w-[93px] rounded-md"
         onClick={() => setCurrentPage(currentPage + 1)}
         >
            Next
         </button>
         )}     
       </div>      
      </div>
       </div>
    )
}