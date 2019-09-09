var reader = new FileReader();
var barSeparator = /[\\\/]/;
var departArray = [];
var provtArray = [];
var disttArray = [];

document.getElementById("openFile").addEventListener('change', function() {
    
    reader.onload = function () {
        var lines = this.result.split('\n');
        for(var line = 0; line < lines.length; line++){
            var result = lines[line].split(barSeparator);
            var lenDepart = result[0].substring(0,3).length;
            
            if (result[1].trim().length==0) {
                myStructure = [];
                myStructure.id = result[0].substring(0,3).trim();
                myStructure.name = result[0].substring(lenDepart,result[0].length).trim();
                myStructure.parentCode = "-";
                myStructure.parentDescription = "-";
                departArray.push(myStructure);
            }
            
            var lenProv = result[1].substring(0,3).length;

            if (result[1].trim().length > 0 && result[2].trim().length==0) {
                myStructure = [];
                myStructure.id = result[1].substring(0,3).trim();
                myStructure.name = result[1].substring(lenProv,result[1].length).trim();
                myStructure.parentCode = result[0].substring(0,3).trim();
                myStructure.parentDescription = result[0].substring(lenDepart,result[0].length).trim();
                provtArray.push(myStructure);
            }

            var lenDist = result[2].substring(0,4).length;

            if (result[0].trim().length > 0 && result[1].trim().length > 0 && result[2].trim().length > 1) {
                myStructure = [];
                myStructure.id = result[2].substring(0,4).trim();
                myStructure.name = result[2].substring(lenDist,result[2].length).trim();
                myStructure.parentCode = result[1].substring(0,3).trim();
                myStructure.parentDescription = result[1].substring(lenProv,result[1].length).trim();
                disttArray.push(myStructure);
            }
        }
        generarTabla(departArray,'DEPARTAMENTO');
        generarTabla(provtArray,'PROVINCIA');
        generarTabla(disttArray,'DISTRITO');
    }

    reader.onerror = function(event) {
        console.error("Error al leer el archivo: " + event.target.error.code);
    };

    reader.readAsText(this.files[0]);
})
