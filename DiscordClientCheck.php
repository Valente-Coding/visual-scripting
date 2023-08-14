<?php

$CLIENT_ID = '1140613904708411463'; // Replace with your Client ID
$CLIENT_SECRET = 'CzS8SIm_x3hBYQ6ouVu1CZS4KMK3Yl6g'; // Replace with your Client Secret
$REDIRECT_URI = 'https://valente-coding.github.io/visual-scripting/'; // Replace with your Redirect URL

if (isset($_GET['code'])) {
    // Exchange code for access token
    $code = $_GET['code'];
    $tokenUrl = 'https://discord.com/api/oauth2/token';
    
    $tokenData = http_build_query(array(
        'client_id' => $CLIENT_ID,
        'client_secret' => $CLIENT_SECRET,
        'grant_type' => 'authorization_code',
        'code' => $code,
        'redirect_uri' => $REDIRECT_URI,
        'scope' => 'identify guilds',
    ));

    $tokenOptions = array(
        'http' => array(
            'method' => 'POST',
            'header' => 'Content-Type: application/x-www-form-urlencoded',
            'content' => $tokenData,
        ),
    );

    $tokenContext = stream_context_create($tokenOptions);
    $tokenResponse = file_get_contents($tokenUrl, false, $tokenContext);
    $tokenInfo = json_decode($tokenResponse, true);

    if (isset($tokenInfo['access_token'])) {
        $accessToken = $tokenInfo['access_token'];

        // Fetch user's guild memberships
        $guildsUrl = 'https://discord.com/api/v10/users/@me/guilds';
        $guildsResponse = file_get_contents($guildsUrl, false, stream_context_create([
            'http' => [
                'header' => 'Authorization: Bearer ' . $accessToken,
            ],
        ]));

        $guildsData = json_decode($guildsResponse, true);

        $desiredRoleID = '1140576961916309584'; // Replace with the ID of the role you want to check

        foreach ($guildsData as $guild) {
            if ($guild['id'] === '1140576200331374692') { // Replace with your Guild ID
                // Fetch member data for the user in the specific guild
                $memberUrl = "https://discord.com/api/v10/guilds/{$guild['id']}/members/@me";
                $memberResponse = file_get_contents($memberUrl, false, stream_context_create([
                    'http' => [
                        'header' => 'Authorization: Bot YOUR_BOT_TOKEN', // Replace with your Bot token
                    ],
                ]));

                $memberData = json_decode($memberResponse, true);

                // Check if the user has the desired role
                if (in_array($desiredRoleID, $memberData['roles'])) {
                    echo 'User has the desired role in the guild.';
                } else {
                    echo 'User does not have the desired role in the guild.';
                }

                break; // No need to check other guilds
            }
        }
    } else {
        echo 'Error obtaining access token.';
    }
} else {
    echo 'Missing code parameter.';
}

?>