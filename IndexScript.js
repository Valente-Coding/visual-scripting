var _currentComponent = null
var _currentComponentLines = []
var _grabComponentSpace = false
var _grabOffset = {x: 0, y: 0}
var _selectedElement = null
var _firstLineTarget = null
var _secondLineTarget = null
var _scale = 1
var _root = null

 
var mouseMovement = function (ev) {
    if (_currentComponent) {
        _currentComponent.style.top = (ev.pageY + _grabOffset.y) + "px";
        _currentComponent.style.left = (ev.pageX + _grabOffset.x) + "px";

        if (_currentComponent.lineFwd)
            _currentComponent.lineFwd.position();
        
        if (_currentComponent.lineBwd)
            _currentComponent.lineBwd.position();

        for (var line of _currentComponentLines) {
            line.position();
        }
    }

    if (_grabComponentSpace) {
        var scrollToX = (_grabOffset.x - ev.pageX)
        var scrollToY = (_grabOffset.y - ev.pageY)
        window.scrollBy(scrollToX, scrollToY);
    }

};

document.addEventListener('mousemove', mouseMovement, false);

function GrabComponentSpace(ev) {
    if (ev.button == 0) {
        if (!_grabComponentSpace) {
            _grabComponentSpace = true
            _grabOffset = {x: ev.pageX, y: ev.pageY}
        }
    }
}

function StopGrabComponentSpace() {
    if (_grabComponentSpace) {
        _grabComponentSpace = false
        _grabOffset = {x: 0, y: 0}
    }
}

function GrabComponent(ev, component) {
    if (ev.button == 0) {
        ev.stopPropagation()
        if (_currentComponent == null) {
            _currentComponent = component
            _currentComponentLines = GetComponentLines(component)
            _grabOffset = {x: _currentComponent.offsetLeft - ev.pageX, y: _currentComponent.offsetTop - ev.pageY}
        }
    }
}

function DropComponent() {
    if (_currentComponent != null) {
        _currentComponent = null
        _currentComponentLines = []
        _grabOffset = {x: 0, y: 0}
    }
}

var _optionsMenuElem = null
function OpenOptionsMenu(ev, elem, options) {
    if (ev.button == 2) {
        ev.stopPropagation()
        _optionsMenuElem.style.top = ev.pageY + "px"
        _optionsMenuElem.style.left = ev.pageX + "px"
        
        _selectedElement = elem

        var optionsElements = ""
        for (var i = 0; i < options.length; i++) {
            optionsElements += options[i]
        }

        _optionsMenuElem.innerHTML = optionsElements

        _optionsMenuElem.classList.remove("hide")
    }
}

function CloseOptionsMenu(ev) {
    if (ev.button == 0) {
        _selectedElement = null // maybe dont need this but i will let it for now due to some tests

        _optionsMenuElem.classList.add("hide")
    }
}

function ZoomSpace(ev, el) {
    ev.preventDefault();

    _scale += ev.deltaY * -0.01;

    _scale = Math.min(Math.max(0.125, _scale), 4);

    _root.style.setProperty('--zoom', _scale);
}

window.addEventListener("contextmenu", e => e.preventDefault());

window.addEventListener('load', function() {
    _optionsMenuElem = document.getElementsByClassName("menu-options-container")[0]

    _root = document.querySelector(':root');

    console.log(JSON.stringify(document.getElementsByClassName("is-control-just-released-component")[0].outerHTML))
});

function LoginDiscord() {
    const CLIENT_ID = '1140613904708411463'; // Replace with your Client ID
    const REDIRECT_URI = 'https://valente-coding.github.io/visual-scripting/DiscordClientCheck.php'; // Replace with your Redirect URL
    
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify`;
    
    window.location.href = authUrl;
}
