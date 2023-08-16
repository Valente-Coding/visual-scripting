window.addEventListener('load', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    if (!code) return

    fetch(window.location.origin + window.location.pathname + "DiscordClientCheck.php", {
        'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
        'method':'POST',
        'body': JSON.stringify({'code': code}),
    })
    .then((response) => response.json())
    .then((responseJson)=>{
        console.info("Response?");
        console.info(responseJson);
    });

});