function BuildScript() {
    var allStartComponents = document.getElementsByClassName("start-component")


    var luaScript = ""
    for (var i = 0; i < allStartComponents.length; i++) {
        var start = allStartComponents[i];
        
        var currentComponent = start
        var native = BuildNative(currentComponent.dataset.native, JSON.parse(currentComponent.dataset.nativevalues))

        luaScript += native

        while (currentComponent.lineFwd) {
            currentComponent = currentComponent.lineFwd.end.component

            native = BuildNative(currentComponent.dataset.native, JSON.parse(currentComponent.dataset.nativevalues))

            luaScript = luaScript.replace("KEEP_GOING_HERE", native)
        }

        luaScript = luaScript.replaceAll("KEEP_GOING_HERE", "")
    }
    

    console.log(luaScript)

    //SendToLua("visual-scripting:RunLuaScript", luaScript)
}

function BuildNative(native, params) {
    var outputNative = native
    
    for (var [name, value] of Object.entries(params)) {
        outputNative = outputNative.replaceAll(name, value)
    }

    return outputNative
}