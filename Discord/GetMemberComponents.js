window.addEventListener('load', function() {
    fetch("https://valente-coding.github.io/visual-scripting/DiscordClientCheck.php", {
        method: "POST",
        body: "",
        headers: {
        },
    })
    .then((response) => response.text())
    .then((data) => {
        console.log(data);
    });
});