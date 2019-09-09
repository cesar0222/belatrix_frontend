import { Component, Output, EventEmitter } from '@angular/core';
import { Ubigeo } from './ubigeo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';
  fileContent: string = '';
  ubigeo : any;
  barSeparator = /[\\\/]/;
  departArray = [];
  provtArray = [];
  disttArray = [];

  @Output() data: any = new EventEmitter();

  onChange(fileList: FileList) {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    fileReader.onload = this.processData.bind(this);
    fileReader.readAsText(file);
  }

  processData(event) {
    let data = event.target.result;
    
    if (data.length > 0) {
        var lines = data.split('\n');
        for(var line = 0; line < lines.length; line++) {
            let result = lines[line].split(this.barSeparator);
            let lenDepart = result[0].substring(0,3).length;
            
            if (result[1].trim().length==0) {
                this.ubigeo = new Ubigeo();
                this.ubigeo.id = Number(result[0].substring(0,3).trim());
                this.ubigeo.name = result[0].substring(lenDepart,result[0].length).trim();
                this.ubigeo.parentCode = "-";
                this.ubigeo.parentDescription = "-";
                this.departArray.push(this.ubigeo);
            }
            
            let lenProv = result[1].substring(0,3).length;

            if (result[1].trim().length > 0 && result[2].trim().length==0) {
                this.ubigeo = new Ubigeo();
                this.ubigeo.id = Number(result[1].substring(0,3).trim());
                this.ubigeo.name = result[1].substring(lenProv,result[1].length).trim();
                this.ubigeo.parentCode = result[0].substring(0,3).trim();
                this.ubigeo.parentDescription = result[0].substring(lenDepart,result[0].length).trim();
                this.provtArray.push(this.ubigeo);
            }

            let lenDist = result[2].substring(0,4).length;

            if (result[0].trim().length > 0 && result[1].trim().length > 0 && result[2].trim().length > 1) {
                this.ubigeo = new Ubigeo();
                this.ubigeo.id = Number(result[2].substring(0,4).trim());
                this.ubigeo.name = result[2].substring(lenDist,result[2].length).trim();
                this.ubigeo.parentCode = result[1].substring(0,3).trim();
                this.ubigeo.parentDescription = result[1].substring(lenDist,result[1].length).trim();
                this.disttArray.push(this.ubigeo);
            }
        }

        console.log(this.provtArray);
    }  
  }
}
