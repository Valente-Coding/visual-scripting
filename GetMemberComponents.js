window.addEventListener('load', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    if (!code) return

    fetch(window.location.origin + window.location.pathname + "DiscordClientCheck.php" + window.location.search, {
        'headers': {
            'Accept': 'text/html',
            'Content-Type': 'text/html'
        },
        'method':'GET',
    })
    .then((response) => response.text())
    .then((responseText)=>{
        console.info("Response?");
        console.info(responseText);     // result: "The name param is received!...(and the rest of your page)
    });

});