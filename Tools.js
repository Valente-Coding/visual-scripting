function GetFileNamesFromPath(path, type, cb) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        var listOfFiles = []
        if (this.readyState == 4 && this.status == 200) {
            thing = this.responseText
            searchFor = null

            if (type == ".json")
                searchFor = /.json</g
            a=0;
            b=0;
            var str = "";
    
            if (searchFor)
                while ((dothtmls = searchFor.exec(thing)) != null ){

                    str = "";
                    console.log(dothtmls.index);
                    
                    a = dothtmls.index;

                    while (thing[a]  != '>' ){
                        a--;
                    }
                    a++;
                    while(thing[a] != '<'){
                        str = str + thing[a];
                        a++;
                    }

                    str = str.replace(type, "")

                    listOfFiles.push(str)
                } 
        }

        cb(listOfFiles)
    };

    xhttp.open("GET", path, true);
    xhttp.send();
}