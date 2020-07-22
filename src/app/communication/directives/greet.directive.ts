import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appGreet]'
})
export class GreetDirective {
  WhatsUp = 'How are you?';
  constructor(elem: ElementRef, renderer: Renderer2) {
    const greet = renderer.createText('Hello');
    renderer.appendChild(elem.nativeElement, greet);
  }
}
