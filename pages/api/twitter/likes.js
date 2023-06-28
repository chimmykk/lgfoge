const { TwitterApi } = require('twitter-api-v2');
const { getToken } = require('next-auth/jwt');

export default async (req, res) => {
  try {
    const { tweetId } = req.body;

    console.log('Tweet ID:', tweetId); // Added console log

    if (!tweetId) {
      return res.status(400).json({ error: 'Tweet ID is required' });
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

    return client.v2.me()
      .then((userData) => {
        const userId = userData.data.id;
        console.log('Authenticated user ID:', userId);

        return client.v2.like(userId, tweetId)
          .then((_data) => {
            console.log('Tweet liked successfully!');
            return res.status(200).json({
              status: 'Ok'
            });
          })
          .catch((err) => {
            console.error('Error liking tweet:', err);
            return res.status(400).json({ error: 'Error liking tweet' });
          });
      })
      .catch((err) => {
        console.error('Error retrieving authenticated user ID:', err);
        return res.status(400).json({ error: 'Error retrieving authenticated user ID' });
      });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};
