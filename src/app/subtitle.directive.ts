import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appSubtitle]',
  standalone: true
})
export class SubtitleDirective {

  @HostListener('click') onClick() {
    console.log('click', 'You hovered over a paragraph');
  }

  constructor() { }

}
