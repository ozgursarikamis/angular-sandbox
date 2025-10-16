import { afterNextRender, Component } from '@angular/core';

@Component({
  selector: 'app-new-hooks',
  imports: [],
  templateUrl: './new-hooks.component.html',
  styleUrl: './new-hooks.component.scss'
})
export class NewHooksComponent {

  constructor() {
    afterNextRender(() => {
      console.log('afterNextRender -> This runs once after the first render.');
    });
  }

  count = 0;

  increment() {
    this.count++;
  }
  decrement() {
    this.count--;
  }
}
