const handleCallback = async () => {
  // Parse the URL to get the authorization code
  const queryParams = new URLSearchParams(window.location.search);
  const authorizationCode = queryParams.get('code');
  const redirect_uri = "https://valente-coding.github.io/visual-scripting/"

  // Exchange authorization code for access token
  fetch('https://www.patreon.com/api/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `code=${authorizationCode}&client_id=1-DqtWay37mEkp3I-6gtUQ-a1O_2IIBRB8wnnrON9sphlbUoCj42Ep_1VECAv4oN&client_secret=KNNTFHkJVgWhhWjThCfgRO4Qj9zfzeehsEROz-If38_1qgh7Yz3ZYDPnMSuztJYA&grant_type=authorization_code&redirect_uri=${redirect_uri}`,
  })
  .then(response => response.json())
  .then(data => {
    const accessToken = data.access_token;

    // Fetch user data and check membership
    fetch('https://www.patreon.com/api/oauth2/v2/identity', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.json())
    .then(userData => {
      const hasMembership = userData.included.some(item => item.type === 'tier');

      if (hasMembership) {
        // User has a membership
        console.log('User has a membership');
      } else {
        // User does not have a membership
        console.log('User does not have a membership');
      }
    });
  });
};

window.addEventListener('load', handleCallback);