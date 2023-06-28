import { Interactions } from "./interactions";
import EachTweet from "../tweets/fetchTweets";

export async function generateStaticParams() {
  
  const data = await fetch('https://pulltweets.onrender.com/pulltweet/test.json');
  const res = await data.json();

  return res.tweets.map((tweets: any, index: number) => ({
    tweet: index.toString()
  }))
}

export default async function TweetNewPage({ params }: {params:any}){

    const rounded = ""
    const { tweet } = params
    const data = await fetch(
      `https://pulltweets.onrender.com/pulltweet/test.json`
    )
    const res = await data.json();
  
    const tweetIndex = Number(tweet);
  
    // console.log("tweetIndex:", tweetIndex);
    // console.log("tweet:", tweet);
    // console.log("res.tweets:", res.tweets);

    return(
        <div className=" bg-bgDark min-h-screen px-2 sm:px-8 lg:px-[200px] xl:px-[320px] pb-10 ">
            <EachTweet
               key={res.tweets[tweetIndex].id}
               id={res.tweets[tweetIndex].id}
               rounded={rounded}
               index={tweet}
               pfp={res.tweets[tweetIndex].author.profile_image_url}
               name={res.tweets[tweetIndex].author?.name}
               username={res.tweets[tweetIndex].author.username}
               time={res.tweets[tweetIndex].created_at}
               tweetText={res.tweets[tweetIndex].text}
               mediaUrl={res.tweets[tweetIndex].media_url}
               likeCount={res.tweets[tweetIndex].public_metrics.like_count}
               replyCount={res.tweets[tweetIndex].public_metrics.reply_count}
            />
            <Interactions   id={res.tweets[tweetIndex].id}/>
        </div>
    )
}


// export default function Fulltweets(){

//     const { data: session } = useSession();

//     return(
//         <div>
//             {session ? 
//                 <TweetNewPage /> : 
//                 <h1 className="font-collector px-4 sm:px-8 xl:px-32 py-32  bg-bgPink">
//                     Woof! You've just sniffed out the Dogepound NFT community's secret hideout! 🐶🌟 But uh-oh,
//                     <br />
//                     <br />
//                     This page is reserved for logged-in Twitter users only. Please login to enjoy the pawsome content.
//                 </h1> 
//             }
//         </div>
//     )
// }
