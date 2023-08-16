window.addEventListener('load', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    if (!code) return

    fetch('https://valente-coding.github.io/visual-scripting/TestPHP.php', {
        'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
        'method':'POST',
        'body': JSON.stringify({'name':'matt'}),
    })
    .then((response) => response.json())
    .then((responseJson)=>{
        console.info("Response?");
        console.info(responseJson);
    });

});