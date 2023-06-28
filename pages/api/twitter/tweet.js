const { getToken } = require('next-auth/jwt');
const { TwitterApi } = require('twitter-api-v2');

export default async (req, res) => {
  const body = JSON.parse(req.body);
  const { status } = body;

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

  try {
    await client.v2.tweet(status);
    console.log('Tweeted successfully!');
    return res.status(200).json({
      status: 'Ok'
    });
  } catch(err) {
    console.error(err);
    return res.status(400).json({
      status: err.message
    });
  }
}
