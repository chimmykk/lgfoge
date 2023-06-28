  export default function Loading() {
  return (
      <div>
          <div className="min-h-screen bg-bgDark">

          <div className="flex flex-col gap-4 lg:flex-row font-inter lg:justify-between px-4 sm:px-8 xl:px-12 py-10">
                {/* search profiles */}
                <div className="flex gap-3 items-center text-white">
                      <input
                        type="text"
                        placeholder="Search profiles..."
                        className="w-[304px] h-[40px] border border-darkBorder rounded-lg outline-none bg-[#1A1A26] px-4 py-2  sm:text-[16px] focus:border-bgPink placeholder-[#808095]"
                        />
                        <button className="bg-[#393954] py-2 px-12  border-darkBorder rounded-lg font-semibold">Search</button>
                  </div>

                  {/* Filter */}
                  <div className="flex gap-6">
                     <div className="bg-[#212134] cursor-default font-semibold bg-opacity-75 hover:bg-opacity-100 border text-textGray border-darkBorder rounded-lg px-4 py-2">
                        Followed by community
                     </div>
                     <div className=" font-semibold rounded-lg w-fit items-center border text-textGray bg-[#212134] border-darkBorder">
                        <button className={`py-2 px-4 h-[40px] rounded-l-lg `} >
                           PFP ONLY
                        </button>
                        <button className={`py-2 px-4 rounded-r-lg`} >
                           VERIFIED HOLDER
                        </button>
                     </div>     
                  </div> 
               </div>

          <div className="animate-pulse px-5 flex flex-col gap-4 py-4">
            {Array.from({ length: 2 }, (load, i) => (
              <div
                className=""
                key={i}
              >
                  <div className=" grid grid-cols-fluid gap-4">
                    <div className="w-full bg-gray-700/50 h-[130px] rounded-2xl"></div>
                    <div className="w-full bg-gray-700/50 h-[130px] rounded-2xl"></div>
                    <div className="w-full bg-gray-700/50 h-[130px] rounded-2xl"></div>
                    <div className="w-full bg-gray-700/50 h-[130px] rounded-2xl"></div>
                    <div className="w-full bg-gray-700/50 h-[130px] rounded-2xl"></div>
                    <div className="w-full bg-gray-700/50 h-[130px] rounded-2xl"></div>
                    <div className="w-full bg-gray-700/50 h-[130px] rounded-2xl"></div>
                    <div className="w-full bg-gray-700/50 h-[130px] rounded-2xl"></div>
                  </div>
              </div>
            ))}
          </div>
          </div>
      </div>
      
  )
}