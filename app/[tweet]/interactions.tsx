"use client"

import Image from "next/image"
import Link from "next/link";
import { useSession } from "next-auth/react"
import { IoMdSend } from "react-icons/io"
import { useState } from "react";
import {RiCloseFill} from "react-icons/ri"
import {AiFillCheckCircle} from "react-icons/ai"

export function Interactions( { id } : any){
    const { data: session } = useSession();
    const [inputText, setInputText] = useState('');
    const [successMessageVisible, setSuccessMessageVisible] = useState(false);


  return(
        <div className="">
        {/* write a comment */}
        <div className="border-b border-darkBorder px-3 md:px-10 bg-bgDarkLint py-5">
  <div className="flex gap-5 items-center">
    <Image src={session?.user?.image || ''} width={50} height={50} alt='image' className='rounded-[1000px] cursor-pointer text-[30px]'/>
    <input 
      type="text" 
      id="commentInput" 
      className="w-full bg-transparent outline-none text-white text-base placeholder:text-textGray" 
      placeholder="Write a comment" 
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
    />
    <button
      onClick={async () => {
        const commentInput = document.getElementById('commentInput') as HTMLInputElement;
        const comment = commentInput ? commentInput.value : '';

        const tweetId = id;

        try {
          const response = await fetch('/api/twitter/comment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tweetId, comment })
          });

          if (response.ok) {
            // alert('Comment posted successfully!');
            setSuccessMessageVisible(true); // Show the success message
          } else {
            alert('Error posting comment.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Error posting comment.');
        }
        setInputText(''); // Reset the inputText state value to an empty string
        setTimeout(() => {
          setSuccessMessageVisible(false); // Hide the success message after 3 seconds (adjust the timeout value as needed)
        }, 2000); // 3000 milliseconds = 3 seconds
    
      }}
    >
      <IoMdSend className="w-[30px] h-[20px] text-textGray cursor-pointer hover:text-bgPink" />
    </button>
  </div>

        </div>
        {/* public comments */}
        <div className=" border-b border-darkBorder px-3 md:px-10 bg-bgDarkLint text-white py-5 rounded-b-xl">

        </div>

        {successMessageVisible && (
        <div className="fixed left-0 right-0 bottom-10 flex justify-center items-end">
        <div className="bg-white rounded-lg p-8 relative shadow-lg animate-pop-up">
          <RiCloseFill onClick={() => setSuccessMessageVisible(false)} className="absolute top-2 right-2" />
          <div className="flex items-center gap-1">
            <p>Comment posted succesfully!</p>
            <AiFillCheckCircle className="text-green-500 w-[25px] h-[25px]" />
          </div>
        </div>
      </div>
      
      )}
    </div>
  )
}
