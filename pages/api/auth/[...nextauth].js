import { access } from "fs";

import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
      
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
      token[account.provider]=
      {
        accessToken:account.oauth_token,
        refreshToken:account.oauth_token_secret,
      }
        token.id = profile.id
      }
      console.log(token)
      return token
    }
  }
};
export default NextAuth(authOptions);