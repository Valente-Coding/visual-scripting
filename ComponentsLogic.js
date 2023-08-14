function OnParameterChange(nativeElem, paramID, newValue) {
    var nativeParams = JSON.parse(nativeElem.dataset.nativevalues)
    
    nativeParams[paramID] = newValue;

    nativeElem.dataset.nativevalues = JSON.stringify(nativeParams)
}


var _selectedinputElem = null
function OpenSelectMenu(ev, input, options) {
    if (ev.button == 0) {
        ev.stopPropagation()

        var topPos = input.getBoundingClientRect().top + window.scrollY;
        var leftPos = input.getBoundingClientRect().left + window.scrollX;
        _optionsMenuElem.style.top = (topPos + input.offsetHeight) + "px"
        _optionsMenuElem.style.left = leftPos + "px"

        var optionsElements = ""
        for (var i = 0; i < options.length; i++) {
            optionsElements += options[i]
        }

        _optionsMenuElem.innerHTML = optionsElements

        _optionsMenuElem.classList.remove("hide")

        _selectedinputElem = input
    }
}

function SelectOption(ev, option) {
    if (_selectedinputElem)
        _selectedinputElem.value = option
}

function CloseSelectMenu(ev) {
    if (ev.button == 0) {
        _optionsMenuElem.classList.add("hide")
    }
}


function RemoveComponent() {
    if (_selectedElement)
        _selectedElement.remove()
}
