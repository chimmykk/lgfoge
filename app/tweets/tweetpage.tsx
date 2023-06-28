
import Discussion from "./createtweet"
import TweetContents from "./tweetContent"
import Link from "next/link"

export default function TweetsPage() {

  const rounded = "rounded-b-xl"

  return (
    <div>
      <div className=" bg-bgDark py-[40px]   min-h-screen px-2 sm:px-8 lg:px-[200px] xl:px-[320px] ">
        <div className="2xl:w-[900px] flex flex-col gap-8 2xl:mx-auto">
          <Discussion />
          <TweetContents rounded={rounded}/>
        </div>
      </div>
    </div>
  )
}