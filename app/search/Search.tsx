
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Status = {
    id: string;
    text: string;
    user: {
      name: string;
      screen_name: string;
      friends_count: string;
      description: string;
      profile_image_url: string
    };
    // entities: {
    //   media?: Array<{
    //     id: string;
    //     media_url_https: string;
    //   }>;
    // };
  };


interface SearchProps {
    setIsModalOpen: (isOpen: boolean) => void;
  }

export default function Search({setIsModalOpen} : SearchProps){

    const [statuses, setStatuses] = useState<Array<Status>>([]);
    console.log(statuses)

    async function handleOnSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const query = formData.get('query');

      const results = await fetch('/api/twitter/search', {
        method: 'POST',
        body: JSON.stringify({
          query
        })
      }).then(res => res.json());

      setStatuses(results.data);
    }


    const toggleModal = () => {
        setIsModalOpen(false);
      };

    return(
        <div  className="fixed z-50 top-0 left-0 w-full min-h-screen flex items-center justify-center">
            <div onClick={toggleModal} className="absolute z-50 w-full h-full bg-black opacity-70"></div>
            <div className="bg-white text-[#343434] w-[800px] font-collector z-50 rounded-xl flex flex-col gap-4 shadow-lg mx-2 px-10 py-14">
                <span className="text-[20px]">start searching</span>

                <form onSubmit={handleOnSearchSubmit}>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full h-[48px] border-[3px] shadow-btn rounded-[1000px] flex items-center px-6 border-black">
                        <input type="search" name="query" className="w-full outline-none bg-transparent" placeholder="start typing..." />
                        </div>
                        <button type="submit" className="w-[162px] h-[48px] rounded-[1000px] border-[3px] border-black text-white bg-bgBlue shadow-btn "><span className="button_top">search</span></button>
                    </div>
                 </form>

                 {statuses && (
                    <div className='flex flex-col gap-5 max-h-[300px] overflow-y-auto '>
                        { statuses.map(({ id , user }) => {
                            return (
                            <div className=' font-inter' key={id}>
                                <Link href={`https://twitter.com/${user.screen_name}`}>{ user.name } <span className='text-bgPink'>(@{ user.screen_name })</span></Link>
                                <Image src={user.profile_image_url} width={100} height={100} alt='img'/>
                                <p>{user.description}</p>
                            </div>
                            );
                        })}
                    </div>
                )}

             </div>
        </div>
    )
}