"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useContext } from "react"
import { FaTwitter } from "react-icons/fa"
import LikeLists from "./likesModal"

type LikedUsers = {
  username : string,
  bio: string,
  profileImageUrl: string
};


// svg
function DogPaw({active}: { active: boolean }) {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill={active ? "#FFA5BD" : "#808095"} width={24} height={21} className="transition-colors duration-200 ease-in-out" ><path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"/>
        </svg>
    )
  }

export default function EachTweet(
   { pfp,
    name,
    username,
    time,
    tweetText,
    mediaUrl,
    likeCount,
    replyCount,
    rounded,
    id,
  index
 }: any){

    const [active, setActive] = useState(false)
  const [modalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add('overflow-hidden');
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.marginRight = `${window.innerWidth - document.body.offsetWidth}px`;
    } else {
      document.body.classList.remove('overflow-hidden');
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.marginRight = '';
    }
  }, [modalOpen]);

  function getTimeDifference(timestamp: string) {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const diff = (now as any) - (createdAt as any);
  
    // Convert milliseconds to seconds
    const diffSeconds = Math.floor(diff / 1000);
  
    if (diffSeconds < 60) {
      return `${diffSeconds} seconds ago`;
    }
  
    // Convert seconds to minutes
    const diffMinutes = Math.floor(diffSeconds / 60);
  
    if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    }
  
    // Convert minutes to hours
    const diffHours = Math.floor(diffMinutes / 60);
  
     if (diffHours <24) {
       return `${diffHours} hours ago`
     }
  
     // Convert hours to days
     const diffDays = Math.floor(diffHours /24);
     
     if (diffDays <7) {
       return `${diffDays} days ago`
     }
     
     // Return the full date for anything older than a week
     return createdAt.toLocaleDateString();
  }

  // const [displayLikedUsers, setDisplayLikedUsers] = useState<Array<LikedUsers>>([])
  // console.log(displayLikedUsers)

  const [usersData, setUsersData] = useState([]);


  const likeLookUps = async () => {
    try {
      const response = await fetch('/api/twitter/userlikelookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tweetId: id }),
      });

      if (response.ok) {
        const { users } = await response.json();
        setUsersData(users);
      } else {
        const error = await response.json();
        throw new Error(error.error);
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

    return(
        <div className={`py-5 bg-bgDarkLint rounded-t-xl border border-darkBorder ${rounded}`}>
                    {/* profile name + tweet logo */}
                    <div className="flex justify-between px-3 md:px-10 pb-5 border-b border-darkBorder items-center">
                        <div className="flex gap-2 items-center">
                        <div className="w-[60px] h-[60px]">
                        <Image src={pfp} width={1000} height={1000} alt="dogie" className="rounded-full"/>
                        </div>
                        <div className="text-white flex flex-col gap-0 leading-[22px]">
                        <p className="text-[18px] font-inter font-bold tracking-[0px]"> {name} <span className=" text-[16px] text-textGray font-medium">• {getTimeDifference(time)}</span></p>
                        <Link href={`https://twitter.com/${username}`} className="text-[14px] text-bgPink font-inter font-bold">@{username}</Link>
                        </div>
                        </div>
                        <div>
                        <Link href={`https://twitter.com/${username}/status/${id}`} target="_blank"><FaTwitter className=" hidden sm:block text-bgPink w-[30px] h-[25px]"/></Link>
                        </div>
                    </div>

                    <Link href={`${index}`}>
                    {/* tweet content */}
                    <div className="px-3 md:px-10 border-b  border-darkBorder">
                        <p className="text-[#fff] py-5">{tweetText}</p>
                        <div className="flex gap-1 justify-center rounded-xl">
                        {mediaUrl && 
                        <div className="w-[400px]  h-[400px] ">
                            <Image src={mediaUrl} width={1000} height={280} alt="tweet1" className="w-full rounded-xl h-full object-contain" />
                        </div>
                        }
                        </div>
                        <div className="py-5 flex gap-7 items-center  justify-between text-bgPink">
                        </div>
                    </div>
                    </Link>
                
                            {modalOpen &&
                            <LikeLists usersData={usersData} setIsModalOpen={setIsModalOpen}/>
                            }  
                    {/* likes and comments */}
                    <div className="px-3 md:px-10 pt-5 flex gap-8">
                      <div className={`flex gap-1 items-center cursor-pointer transition-colors duration-200 ease-in-out ${active ? "text-bgPink": "text-[#808095]" }`} 
                          onClick={(e) => { 
                            e.preventDefault(); // Prevents Link from navigating
                            setActive(!active);
                            fetch('/api/twitter/likes', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({ tweetId: id })
                            });
                          }}>  
                          <DogPaw active={active}/>
                          <div className="flex gap-1 items-center">
                            <p className="font-semibold">Like </p>
                            <div 
                              className="rounded-full bg-[#1A1A26] px-2 py-1 text-white text-xs font-semibold"  
                              onClick={(e) => { e.preventDefault(); setIsModalOpen(!modalOpen); likeLookUps()}}
                            >
                              {likeCount}
                            </div>
                          </div>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                          <Link  href={`${index}`}><p className="text-textGray font-semibold">Comment</p></Link>
                          <div className="rounded-full bg-[#1A1A26] px-2 py-1 text-white text-xs font-semibold">
                          <Link  href={`${index}`}><p className=" font-semibold">{replyCount}</p></Link>
                          </div>
                      </div>
                    </div>
                </div>
    )
}