function generarTabla(array, title) {

    // Obtener la referencia del elemento body
    //var divContent = document.getElementsByTagName("body")[0];
    var divContent = document.getElementById("tableContents");
        
    // Crea un elemento <table> y un elemento <tbody>
    var title = document.createElement("h3"),
        table = document.createElement("table");
        brElement = document.createElement("br");

    title.setAttribute("text",title);
    table.setAttribute("border","1px solid black");

    /* Encabezados de las colunas */
    tr = document.createElement('tr');
    td = document.createElement('td');
    tn = document.createTextNode("Codigo");
    td.appendChild(tn);
    tr.appendChild(td);
    td = document.createElement('td');
    tn = document.createTextNode("Nombre");
    td.appendChild(tn);
    tr.appendChild(td);
    td = document.createElement('td');
    tn = document.createTextNode("Codigo Padre");
    td.appendChild(tn);
    tr.appendChild(td);
    td = document.createElement('td');
    tn = document.createTextNode("Descripcion Padre");
    td.appendChild(tn);
    tr.appendChild(td);

    table.appendChild(tr);

    for (row=0; row < array.length; row++){
        tr = document.createElement('tr');
        td = document.createElement('td');
        tn = document.createTextNode(array[row].id);
        td.appendChild(tn);
        tr.appendChild(td);
        td = document.createElement('td');
        tn = document.createTextNode(array[row].name);
        td.appendChild(tn);
        tr.appendChild(td);
        td = document.createElement('td');
        tn = document.createTextNode(array[row].parentCode);
        td.appendChild(tn);
        tr.appendChild(td);
        td = document.createElement('td');
        tn = document.createTextNode(array[row].parentDescription);
        td.appendChild(tn);
        tr.appendChild(td);
        
        table.appendChild(tr);
    }
    divContent.appendChild(title);
    divContent.appendChild(brElement);
    divContent.appendChild(table);
}

