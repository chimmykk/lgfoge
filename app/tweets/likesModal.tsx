import { AiOutlineCloseCircle } from "react-icons/ai"
import { FaTwitter } from "react-icons/fa"
import Image from "next/image";
import Link from "next/link";
import likes from "./likes.json"
import { useState, useEffect } from "react";

interface SearchProps {
    setIsModalOpen: (isOpen: boolean) => void;
    usersData: Status[];
  }

  type Status = {
    username: string;
    bio: string;
    profileImageUrl: string;
  };

  export default function LikeLists({ setIsModalOpen, usersData }: SearchProps) {

    const toggleModal = () => {
        setIsModalOpen(false);
      };

    //   const [statuses, setStatuses] = useState<Array<Status>>([]);
    //   console.log(statuses)
  
    //   async function handleOnSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    //     e.preventDefault();
  
    //     const formData = new FormData(e.currentTarget);
    //     const query = formData.get('query');
  
    //     const results = await fetch('/api/twitter/userlikelookup.js', {
    //       method: 'POST',
    //       body: JSON.stringify({
    //         query
    //       })
    //     }).then(res => res.json());
    //     setStatuses(results.data);
    //   }
      
    //   useEffect(() => {
    //     handleOnSearchSubmit
    //   }, [])

    //   console.log(statuses)

    return(
        <div  className="fixed z-50 top-0 left-0 w-full h-screen flex items-center justify-center">
            <div onClick={(e) => {  e.preventDefault();toggleModal()}} className="absolute overflow-y-hidden z-50 w-full h-full bg-white opacity-20"></div>
                <div className="bg-bgDark max-h-screen lg:min-h-[500px] lg:max-h-[500px] overflow-y-auto text-[#fff] lg:w-1/2 font-collector z-50 rounded-xl flex flex-col shadow-lg  py-4">
                    <div className=" flex justify-between px-5 mb-5 items-center">
                        <span className="text-[20px]">Like By</span>
                        <AiOutlineCloseCircle onClick={toggleModal} className="w-[30px] hover:text-bgPink cursor-pointer h-[30px]"/> 
                    </div>
                    {usersData.map((like, i) => (
                         <div
                         className=" flex flex-col "
                         key={i}
                     >
                            {/* count */}
                             <div className="hover:bg-bgDarkLint font-sans py-3 px-5 flex justify-between items-center">
                             {/* left */}
                             <div className=" flex items-center gap-2">
                                 <div className="w-[45px] h-[45px] "> {/* pfp */}
                                     <Image src={like.profileImageUrl} width={45} height={45} alt="doggo" className="rounded-full"/>
                                 </div>
                                 <div> {/* profile info */}
                                     <h1 className="font-bold">{like.username}</h1>
                                     <Link href={`https://twitter.com/${like.username}`} target="_blank" className=" text-textGray ">
                                         <div className="group relative w-fit flex items-center gap-1">
                                             <FaTwitter className="w-[17px] h-[17px]"/>
                                             <span>{like.username}</span>
                                             <p className="group-hover:opacity-100 transition-opacity bg-bgPink  text-base text-black rounded-md absolute left-0 
                                         -translate-y-[120%] opacity-0 hidden group-hover:block px-2">Twitter profile</p>
                                         </div>
                                     </Link>
                                     <p>{like.bio}</p>
                                 </div>
                             </div>
                             
                         </div>
                     </div>
                    ))}
                </div>
        </div>
    )

 
}