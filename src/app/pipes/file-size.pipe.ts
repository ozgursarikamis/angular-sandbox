import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fileSize' })
export class FileSizePipe implements PipeTransform {
    transform(size: number, extension: 'MB' | 'GB' = 'MB', decimals: number = 2): string {
        return (size / (1024 * 1024)).toFixed(decimals) + ' ' + extension;
    }
}