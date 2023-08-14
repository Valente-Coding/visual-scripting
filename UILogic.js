

function OpenUI() {
    document.getElementsByTagName("body")[0].style.display = "block"
}

function CloseUI() {
    document.getElementsByTagName("body")[0].style.display = "none"

    SendToLua("CloseUI")
}



window.addEventListener('load', function() {
    document.onkeydown = function (e) {
        if (e.key == "Escape") {
            CloseUI()
        }
    };
});
