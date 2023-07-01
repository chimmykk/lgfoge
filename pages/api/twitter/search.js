const axios = require('axios');

export default async (req, res) => {
  const body = JSON.parse(req.body);
  const { query } = body;

  // Set up your Twitter API credentials
  const apiKey = 'YOUR_API_KEY';
  const bearerToken = 'AAAAAAAAAAAAAAAAAAAAACzGoQEAAAAAc2bfbcyL0gBFSxdZauMaRFEUwjY%3D9xSSvhqSsI4x9kKPRz0WXcaEe2ltRScpFvisvtom8eDCZTZ0PC';

  // Set the endpoint URL
  const endpointUrl = 'https://api.twitter.com/2/users/by';

  // Set the headers with the necessary authentication
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${bearerToken}`
  };

  // Set the request parameters
  const params = {
    usernames: query,
    'user.fields': 'name,username,description,profile_image_url,public_metrics'
  };

  try {
    // Make the API request
    const response = await axios.get(endpointUrl, { headers, params });

    // Extract the user data from the response
    const users = response.data.data.map((user) => {
      return {
        username: user.username,
        Name: user.name,
        bio: user.description,
        profileImageUrl: user.profile_image_url.replace('_normal', '_400x400'),
      };
    });

    console.log(users)

    res.status(200).json({ users });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      console.error('Error:', error.response.data.errors);
      res.status(400).json({ error: error.response.data.errors });
    } else {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
};