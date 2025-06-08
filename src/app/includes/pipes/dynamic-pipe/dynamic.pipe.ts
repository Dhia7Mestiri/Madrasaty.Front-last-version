import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dynamicPipe'
})
export class DynamicPipe implements PipeTransform
{
    transform(value: any, pipe: PipeTransform, ...args: any[]): any
    {
        return pipe.transform(value, ...args);
    }
}