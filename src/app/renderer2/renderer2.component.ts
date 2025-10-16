import { AfterViewInit, Component, ElementRef, inject, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-renderer2',
  imports: [],
  templateUrl: './renderer2.component.html',
  styleUrl: './renderer2.component.scss'
})
export class Renderer2Component implements AfterViewInit {
  // ElementRef gives you a reference to the host DOM element.
  // Renderer2 is used to safely modify that element.
  private elementRef: ElementRef = inject(ElementRef);
  private renderer2: Renderer2 = inject(Renderer2);

  ngAfterViewInit(): void { }

  triggerRenderer() {    
    const button = this.elementRef.nativeElement.querySelector('button#regular-button');
    this.renderer2.setStyle(button, 'background-color', 'red');
    this.renderer2.setProperty(button, 'innerHTML', 'Rendered by Renderer2');
  }
}
