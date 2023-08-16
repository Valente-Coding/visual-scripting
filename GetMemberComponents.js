// Replace these with your actual values
const clientId = '1140613904708411463';
const redirectUri = 'https://valente-coding.github.io/visual-scripting/';
const scope = 'identify guilds';

// Handle the OAuth2 callback
const handleCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    const response = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: 'CzS8SIm_x3hBYQ6ouVu1CZS4KMK3Yl6g',
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        scope: scope,
      }),
    });

    const data = await response.json();
    const accessToken = data.access_token;

    // Use the access token to make API requests
    const guildsResponse = await fetch('https://discord.com/api/v10/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const guildsData = await guildsResponse.json();

    // Assuming guildsData is an array of guild objects
    for (const guild of guildsData) {
      const rolesResponse = await fetch(`https://discord.com/api/v10/guilds/${guild.id}/members/@me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const rolesData = await rolesResponse.json();

      // Assuming rolesData.roles is an array of role objects
      if (rolesData.roles.some(role => role.id === '1140576961916309584')) {
        console.log(`User has the specific role in guild: ${guild.name}`);
      }
    }
  }
};

// Call the callback handler when the page loads
window.addEventListener('load', handleCallback);