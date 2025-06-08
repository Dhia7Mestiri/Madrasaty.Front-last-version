import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  overStar: number | undefined;
  max = 5;
  mark: string;
  percent: number;
  DocumentType: string;
  constructor() { }



  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / this.max) * 100;
   // this.rate = value;
    if (this.percent <= 20) {
        this.mark = 'Innacceptable'
    }
    else if (this.percent <= 40) {
        this.mark = 'Faible'
    }
    else if (this.percent <= 60) {
        this.mark = 'Moyen'
    }
    else if (this.percent > 60 && this.percent <= 80) {
        this.mark = 'Bien'
    }
    else {
        this.mark = 'Très  Bien'
    }
}


buildTableBody(data, columns) {
  var body = [];
  body.push(columns);
  data.forEach(function (row) {
      var dataRow = [];
      columns.forEach(function (column) {
          dataRow.push(row[column].toString());
      })
      body.push(dataRow);
  });
  return body;
}

table(data, columns, styles) {
  return {
      style: styles,
      table: {
          headerRows: 1,
          body: this.buildTableBody(data, columns),
      }
  };
}



GetDocExtensionAndSetTheIcon(item){
    var file_ext=/[^.]+$/.exec(item).toString();
    switch (file_ext) {
      case 'csv':
       this.DocumentType = "csv.png"
        break;
      case 'xlsx':
        this.DocumentType= "excel.png"
        break;
      case 'pdf':
        this.DocumentType= "pdf.svg"
        break;
      case 'pptx':
      case 'ppt':
        this.DocumentType= "powerpoint.png"
        break;
      case 'docx':
        this.DocumentType= "word.png"
        break; 
      case 'jpeg':
      case 'jpg':
      case 'png':
      case 'tiff':
      case 'gif':
        this.DocumentType= "image.png"
        break;
        case 'txt':
          this.DocumentType= "text.png"
          break;
      default:
        this.DocumentType= "doc.svg"
  
     
    }
    return this.DocumentType
}

}
