import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'TruncateHtml'
})
export class TruncateHtmlPipe implements PipeTransform {

  transform(text: string ) {

    if (!text) {
        return text;
    }

    let without_html = text.replace(/<(?:.|\n)*?>/gm, ' ');
    
    return without_html;
}

}
