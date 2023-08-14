window.addEventListener('load', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    if (code) {
        const CLIENT_ID = '1140613904708411463'; // Replace with your Client ID
        const CLIENT_SECRET = 'CzS8SIm_x3hBYQ6ouVu1CZS4KMK3Yl6g'; // Replace with your Client Secret
        const REDIRECT_URI = 'https://discord.com/api/oauth2/authorize?client_id=1140613904708411463&redirect_uri=https%3A%2F%2Fvalente-coding.github.io%2Fvisual-scripting%2F&response_type=code&scope=identify%20guilds%20guilds.members.read'; // Replace with your Redirect URL
        const GUILD_ID = '1140576200331374692'; // Replace with your Guild ID
        const DESIRED_ROLE_ID = '1140576961916309584'; // Replace with the ID of the desired role

        const tokenUrl = 'https://discord.com/api/oauth2/token';
        const tokenParams = new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
            scope: 'identify%20guilds',
        });

        fetch(tokenUrl, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: tokenParams,
        })
            .then(response => response.json())
            .then(tokenInfo => {
            const accessToken = tokenInfo.access_token;
            
            const guildsUrl = 'https://discord.com/api/v10/users/@me/guilds';

            fetch(guildsUrl, {
                headers: {
                Authorization: `Bearer ${accessToken}`,
                },
            })
                .then(response => response.json())
                .then(guildsData => {
                    const guild = guildsData.find(g => g.id === GUILD_ID);
                    if (guild) {
                        const memberUrl = `https://discord.com/api/v10/guilds/${GUILD_ID}/members/@me`;

                        fetch(memberUrl, {
                            headers: {
                                Authorization: `Bot YOUR_BOT_TOKEN`, // Replace with your Bot token
                            },
                        })
                        .then(response => response.json())
                        .then(memberData => {
                            if (memberData.roles.includes(DESIRED_ROLE_ID)) {
                                console.log('User has the desired role in the guild.');
                            } else {
                                console.log('User does not have the desired role in the guild.');
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching member data:', error);
                        });
                    } else {
                        console.log('User is not a member of the specified guild.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching guilds:', error);
                });
            })
            .catch(error => {
                console.error('Error exchanging code for access token:', error);
            });
    }

});