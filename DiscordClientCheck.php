<?php
header('Content-Type: application/json'); 


$code = $_POST['code'];

if ($code) {
    $CLIENT_ID = '1140613904708411463'; // Replace with your Client ID
    $CLIENT_SECRET = 'CzS8SIm_x3hBYQ6ouVu1CZS4KMK3Yl6g'; // Replace with your Client Secret
    $REDIRECT_URI = 'https://valente-coding.github.io/visual-scripting/'; // Replace with your Redirect URL
    $GUILD_ID = '1140576200331374692'; // Replace with your Guild ID
    $DESIRED_ROLE_ID = '1140576961916309584'; // Replace with the ID of the desired role
    $BOT_TOKEN = 'MTE0MDYxMzkwNDcwODQxMTQ2Mw.GwtxFC.8IOQ2A2ZhQ7YChrr_7WjWtKDxbwpMJqDqsWlGQ';

    // Exchange code for access token
    $tokenUrl = 'https://discord.com/api/oauth2/token';
    $tokenParams = http_build_query(array(
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
            'content' => $tokenParams,
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

        $guild = array_filter($guildsData, function ($g) use ($GUILD_ID) {
            return $g['id'] === $GUILD_ID;
        });

        if (!empty($guild)) {
            $memberUrl = "https://discord.com/api/v10/guilds/{$GUILD_ID}/members/@me";
            $memberResponse = file_get_contents($memberUrl, false, stream_context_create([
                'http' => [
                    'header' => "Authorization: Bot $BOT_TOKEN",
                ],
            ]));

            $memberData = json_decode($memberResponse, true);

            if (in_array($DESIRED_ROLE_ID, $memberData['roles'])) {
                echo 'User has the desired role in the guild.';
            } else {
                echo 'User does not have the desired role in the guild.';
            }
        } else {
            echo 'User is not a member of the specified guild.';
        }
    } else {
        echo 'Error obtaining access token.';
    }
} else {
    echo 'Missing code parameter.';
}

?>
