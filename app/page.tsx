"use client"

import Homepage from "./landingpage/landingpage"
import TweetsPage from "./tweets/tweetpage";
import { useSession } from 'next-auth/react';

export default function Home() {

  const { status } = useSession();

  if (status === "authenticated") {
    return <TweetsPage />
  }

  return (
    <main>
      <Homepage />
    </main>
  );
}
