window.addEventListener('message', function(event) {
    var type = event.data.type;
    if (type == "OpenUI") {
        OpenUI()
    }
})


function SendToLua(target, data) {
    console.log("Sending data to " + target)
    fetch('https://visual-scripting/' + target, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            data: data
        }),
    })
}