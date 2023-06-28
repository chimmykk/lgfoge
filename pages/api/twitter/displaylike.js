import Twitter from 'twitter-lite';
import { getToken } from 'next-auth/jwt';

export default async (req, res) => {
  try {
    const { tweetId } = req.body;

    if (!tweetId) {
      return res.status(400).json({ error: 'Tweet ID is required' });
    }

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET
    });

    const client = new Twitter({
      subdomain: 'api',
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: token.twitter.accessToken,
      access_token_secret: token.twitter.refreshToken
    });

    const result = await client.get(`tweets/${tweetId}/liking_users`);

    return res.status(200).json({
      status: 'Ok',
      data: result
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};
