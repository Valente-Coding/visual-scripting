var _firstLineTarget = null
var _secondLineTarget = null


function ComponentsConnection(ev, parent, lineTarget) {
    if (ev.button != 0)
        return

    ev.stopPropagation();

    lineTarget.component = parent;

    if (_firstLineTarget == null){
        _firstLineTarget = lineTarget;
        _firstLineTarget.classList.add("connected")
    } 
    else if (_secondLineTarget == null)
        _secondLineTarget = lineTarget


    if (!_firstLineTarget || !_secondLineTarget)
        return

    console.clear()
    console.log("Found two targets.")

    if (_firstLineTarget == _secondLineTarget) {
        if (_firstLineTarget.classList.contains("connection-fwd")) 
            RemoveComponentsConnection(_firstLineTarget.component.lineFwd)
        else if (_firstLineTarget.classList.contains("connection-bwd")) 
            RemoveComponentsConnection(_firstLineTarget.component.lineBwd)

        _firstLineTarget.classList.remove("connected")
        _firstLineTarget = null
        _secondLineTarget = null
        return
    }

    if (_firstLineTarget.component == _secondLineTarget.component) {
        _firstLineTarget.classList.remove("connected")

        _firstLineTarget = null
        _secondLineTarget = null

        console.log("Targets cant have the same parent.")        
        return
    }

    var fwdConnector = _firstLineTarget.classList.contains("connection-fwd") ? _firstLineTarget : _secondLineTarget.classList.contains("connection-fwd") ? _secondLineTarget : null
    var bwdConnector = _firstLineTarget.classList.contains("connection-bwd") ? _firstLineTarget : _secondLineTarget.classList.contains("connection-bwd") ? _secondLineTarget : null

    if (!fwdConnector || !bwdConnector) {
        _firstLineTarget.classList.remove("connected")

        _firstLineTarget = null
        _secondLineTarget = null

        console.log("There needs to be one fwd and one bwd connection.")
        return
    }

    if (fwdConnector.component.lineFwd) 
        RemoveComponentsConnection(fwdConnector.component.lineFwd)
    
    if (bwdConnector.component.lineBwd) 
        RemoveComponentsConnection(bwdConnector.component.lineBwd)

    var line = new LeaderLine(
        fwdConnector,
        bwdConnector,
        {
            color: 'white', 
            size: 2, 
            startSocket: 'right', 
            endSocket: 'left',
            startPlug: 'behind',
            endPlug: 'behind',
            path: 'grid'
        }
    );

    fwdConnector.component.lineFwd = line
    bwdConnector.component.lineBwd = line

    fwdConnector.classList.add("connected")
    bwdConnector.classList.add("connected")

    _firstLineTarget = null
    _secondLineTarget = null

    console.log("New connection created.")

}

function RemoveComponentsConnection(lineToDelete) {
    if (!lineToDelete)
        return

    lineToDelete.start.classList.remove("connected")
    lineToDelete.end.classList.remove("connected")

    lineToDelete.start.component.lineFwd = null
    lineToDelete.end.component.lineBwd = null

    lineToDelete.remove()

    console.log("Removed old connection")
}

function StopConnection(ev) {
    if (ev.button != 0)
        return

    ev.stopPropagation();

    if (_firstLineTarget != null){
        _firstLineTarget.classList.remove("connected")

        if (!_firstLineTarget.inputsList)
            _firstLineTarget.classList.remove("connected-var")

        if (_firstLineTarget.inputsList && _firstLineTarget.inputsList.length == 0)
            _firstLineTarget.classList.remove("connected-var")
    }

    _firstLineTarget = null;
    _secondLineTarget = null
}

function VariablesConnection(ev, parent, lineTarget) {
    if (ev.button != 0)
        return

    ev.stopPropagation();

    if (!_firstLineTarget && lineTarget.nodeName == "DIV") {
        _firstLineTarget = lineTarget;
        _firstLineTarget.component = parent;
        _firstLineTarget.classList.add("connected-var")
    } 
    else if (!_secondLineTarget && lineTarget.nodeName == "INPUT")
        _secondLineTarget = lineTarget

    if (!_firstLineTarget && _secondLineTarget) {
        if (_secondLineTarget.varConnected) 
            RemoveVariableConnection(_secondLineTarget.varConnected)

        _secondLineTarget = null
    }

    if (!_firstLineTarget || !_secondLineTarget)
        return
    

    console.clear()
    console.log("Found two targets.")

    if (_secondLineTarget.dataset.inputtype != "string" && _firstLineTarget.dataset.vartype != _secondLineTarget.dataset.inputtype) {
        _firstLineTarget.classList.remove("connected-var")

        _firstLineTarget = null
        _secondLineTarget = null
        console.log("Not the same var type.")
        return
    }

    console.log("Same var type.")


    if (_secondLineTarget.varConnected) 
        RemoveVariableConnection(_secondLineTarget.varConnected)

    
    if (!_firstLineTarget.inputsList)
        _firstLineTarget.inputsList = []

    _firstLineTarget.inputsList.push(_secondLineTarget)

    _secondLineTarget.varConnected = _firstLineTarget


    _secondLineTarget.readonly = true;

    if (_secondLineTarget.type == "checkbox") {
        _secondLineTarget.checked = (_firstLineTarget.component.dataset.value === 'true')
    }
    else
        _secondLineTarget.value = _firstLineTarget.component.dataset.value

    _secondLineTarget.onchange();

    var line = new LeaderLine(
        _firstLineTarget,
        _secondLineTarget,
        {
            color: 'white', 
            size: 2, 
            startSocket: 'right', 
            endSocket: _secondLineTarget.dataset.lineside ? _secondLineTarget.dataset.lineside : 'right',
            startPlug: 'behind',
            endPlug: 'behind',
            path: 'grid'
        }
    );

    _secondLineTarget.line = line

    _firstLineTarget = null
    _secondLineTarget = null

    console.log("New variable connection made.")
}

function RemoveVariableConnection(variable) {
    if (!variable.inputsList)
        return

    _secondLineTarget.line.remove()
    _secondLineTarget.line = null
    _secondLineTarget.varConnected = null

    variable.inputsList = variable.inputsList.filter(function(el) { return el != _secondLineTarget; }); 

    if (variable.inputsList.length <= 0) 
        variable.classList.remove("connected-var")

    _secondLineTarget.readonly = false;

    console.log("Clear old input connection.")
}

function UpdateVarConnectionsInputs(varConnector, newValue) {
    if (!varConnector.inputsList)
        return

    for (var input of varConnector.inputsList) {
        if (input.type == "checkbox") {
            input.checked = newValue
        }
        else
            input.value = newValue

        input.onchange()
    }
}