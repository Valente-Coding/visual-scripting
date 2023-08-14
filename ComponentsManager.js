var _componentNames = []

GetFileNamesFromPath("./Components/", ".json", (names) => {_componentNames = names})

function GetComponentsByName(input, parent, value) {

    var menuOptions = document.querySelectorAll(".menu-option")
    menuOptions.forEach(option => {
        option.remove();
    });

    if (value == "")
        return


    for (var fileName of _componentNames) {
        if (fileName.toUpperCase().includes(value.toUpperCase())) {
            parent.insertAdjacentHTML('beforeend', '<div class=\'menu-option\' onmouseup=\'CreateComponent(event, this.innerHTML)\'>' + fileName + '</div>' );
        }
    }
}

function CreateComponent(ev, name) {
    fetch("./Components/" + name + ".json")
    .then((response) => response.json())
    .then((component) => {
        var totalOfComponents = (component.match(/component-container/g) || []).length
        
        document.getElementsByClassName("components-space")[0].insertAdjacentHTML('beforeend', component);

        var componentContainers = document.getElementsByClassName("component-container")

        for (var i = 0; i < totalOfComponents; i++) {
            var componentDIV = componentContainers[componentContainers.length - totalOfComponents + i]
            
            componentDIV.style.top = ev.pageY + "px"
            componentDIV.style.left = i == 0 ?  ev.pageX + "px" :  (ev.pageX + componentContainers[componentContainers.length - totalOfComponents + i - 1].offsetWidth + 10) + "px"
        }
    });
}

function GetComponentLines(component) {
    var lines = []

    for (var input of component.getElementsByTagName("input")) {
        if (input.line)
            lines.push(input.line);
    }

    for (var varConnector of component.getElementsByClassName("variable-connections")) {
        if (varConnector.inputsList)
            for (var imput of varConnector.inputsList)
                lines.push(imput.line);
    }

    return lines
}

