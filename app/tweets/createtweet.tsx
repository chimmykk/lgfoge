"use client"

import { ChangeEventHandler, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai"
import { RiCloseFill } from "react-icons/ri"

export default function Discussion() {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [inputText, setInputText] = useState('');



  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };


  async function handleOnTweetSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const status = formData.get('status');

    console.log(status); // Add this line

    const results = await fetch('/api/twitter/tweet', {
      method: 'POST',
      body: JSON.stringify({
        status
      })
    }).then(res => res.json());

    setSuccessMessageVisible(true); // Show the success message

    setTimeout(() => {
      setSuccessMessageVisible(false); // Hide the success message after 3 seconds (adjust the timeout value as needed)
    }, 2000); // 3000 milliseconds = 3 seconds

    setInputText(''); // Reset the inputText state value to an empty string
  }

  return (
    <div>
      <form onSubmit={handleOnTweetSubmit} className='flex flex-col items-end gap-2'>
        <div className="w-full rounded-lg opacity-100 border border-darkBorder  text-white p-3 py-6 pl-10 flex font-inter gap-3 items-center justify-between bg-bgDarkLint">
         <div className="w-full rounded-full">
          <textarea
            name="status"
            placeholder="Write a tweet..."
            className="w-full bg-[#1A1A26] outline-none placeholder-[#808095] border border-darkBorder py-4 px-4 rounded-xl resize-none custom-scrollbar"
            autoComplete="off"
            value={inputText}
            onChange={handleInputChange}
            style={{ whiteSpace: "pre-wrap" }}
          ></textarea>
         </div>
           <button 
            disabled={inputText.length === 0} 
            className={` font-inter px-12 py-2 border border-darkBorder rounded-xl font-semibold text-white bg-[#393954] transition duration-300 ease-in-out ${inputText.length !== 0 ? "bg-opacity-100 " : "bg-opacity-50"}`}
          >
            Tweet
          </button>
        </div>
        
      </form>


      {successMessageVisible && (
        <div className="fixed inset-0 flex h-fit mt-5 justify-center font-collector">
          <div className="bg-white rounded-lg p-8 relative shadow-lg animate-pop-up">
            <RiCloseFill onClick={() => setSuccessMessageVisible(false)} className="absolute top-2 right-2"/>
            <div className="flex items-center gap-1">
              <p>Your tweet has been posted</p>
              <AiFillCheckCircle  className="text-green-500 w-[25px] h-[25px]"/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}