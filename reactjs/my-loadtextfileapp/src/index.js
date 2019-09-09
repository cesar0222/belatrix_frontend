import React, { Component } from 'react';
import { render } from 'react-dom';
import { Ubigeo } from './model/ubigeo';
import TableColumns from './components/table-colums.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      depart: [],
      prov: [],
      dist: []
    };
  }

  showFile = () => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
         var preview = document.getElementById('show-text');
         var file = document.querySelector('input[type=file]').files[0];
         var reader = new FileReader();
         var textFile = /text.*/;
          
         if (file.type.match(textFile)) {
           reader.onload = this.processFile.bind(this);

         } else {
            preview.innerHTML = "<span class='error'>No se encontro el archivo</span>";
         }
         reader.readAsText(file);

   } else {
      alert("El navegador no soporta HTML 5 File API");
   }
  }

  processFile(event) {
    let data = event.target.result;
    let barSeparator = "/";
    let departList = this.state.depart;
    let provList = this.state.prov;
    let distList = this.state.dist;

    if (data.length > 0) {
        var lines = data.split('\n');
        for(var line = 0; line < lines.length; line++) {
            let result = lines[line].split(barSeparator);
            let lenDepart = result[0].substring(0,3).length;
            
            if (result[1].trim().length===0) {
                this.ubigeo = new Ubigeo();
                this.ubigeo.id = Number(result[0].substring(0,3).trim());
                this.ubigeo.name = result[0].substring(lenDepart,result[0].length).trim();
                this.ubigeo.parentCode = "-";
                this.ubigeo.parentDescription = "-";
                departList.push(this.ubigeo);
            }
            
            let lenProv = result[1].substring(0,3).length;

            if (result[1].trim().length > 0 && result[2].trim().length===0) {
                this.ubigeo = new Ubigeo();
                this.ubigeo.id = Number(result[1].substring(0,3).trim());
                this.ubigeo.name = result[1].substring(lenProv,result[1].length).trim();
                this.ubigeo.parentCode = result[0].substring(0,3).trim();
                this.ubigeo.parentDescription = result[0].substring(lenDepart,result[0].length).trim();
                provList.push(this.ubigeo);
            }

            let lenDist = result[2].substring(0,4).length;

            if (result[0].trim().length > 0 && result[1].trim().length > 0 && result[2].trim().length > 1) {
                this.ubigeo = new Ubigeo();
                this.ubigeo.id = Number(result[2].substring(0,4).trim());
                this.ubigeo.name = result[2].substring(lenDist,result[2].length).trim();
                this.ubigeo.parentCode = result[1].substring(0,3).trim();
                this.ubigeo.parentDescription = result[1].substring(lenDist,result[1].length).trim();
                distList.push(this.ubigeo);
            }

            this.setState({
              depart: departList,
              prov: provList,
              dist: distList
            })
        }
    }
  }

  render() {
    return (
      <div>
          <input type="file" onChange={this.showFile} />
          <div id="show-text">Seleccionar archivo</div>

          <h3>DEPARTAMENTO</h3>
          <table style={{"borderWidth":"1px", 'fontColor':"#000000", 'borderStyle':'solid'}}>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Código Padre</th>
                    <th>Descripción Padre</th>        
                </tr>
            </thead>
            <tbody>
                <TableColumns arrayFromParent = {this.state.depart} />
            </tbody>
          </table>

          <h3>PROVINCIA</h3>
          <table style={{"borderWidth":"1px", 'fontColor':"#000000", 'borderStyle':'solid'}}>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Código Padre</th>
                    <th>Descripción Padre</th>        
                </tr>
            </thead>
            <tbody>
                <TableColumns arrayFromParent = {this.state.prov} />
            </tbody>
          </table>

          <h3>DISTRITO</h3>
          <table style={{"borderWidth":"1px", 'fontColor':"#000000", 'borderStyle':'solid'}}>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Código Padre</th>
                    <th>Descripción Padre</th>        
                </tr>
            </thead>
            <tbody>
                <TableColumns arrayFromParent = {this.state.dist} />
            </tbody>
          </table>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
