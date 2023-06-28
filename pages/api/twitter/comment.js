const { TwitterApi } = require('twitter-api-v2');
const { getToken } = require('next-auth/jwt');

export default async (req, res) => {
  try {
    const { tweetId, comment } = req.body;

    if (!tweetId || !comment) {
      return res.status(400).json({ error: 'Tweet ID and comment are required' });
    }

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET
    });

    const client = new TwitterApi({
      appKey: process.env.TWITTER_CONSUMER_KEY,
      appSecret: process.env.TWITTER_CONSUMER_SECRET,
      accessToken: token.twitter.accessToken,
      accessSecret: token.twitter.refreshToken
    });

    return client.v2.reply(comment, tweetId)
      .then((_replyData) => {
        console.log('Reply posted successfully!');
        return res.status(200).json({ status: 'Ok' });
      })
      .catch((err) => {
        console.error('Error posting reply:', err);
        return res.status(400).json({ error: 'Error posting reply' });
      });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};
