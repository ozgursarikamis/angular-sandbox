import { Component, output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent {
  o = output<string>();
  
  clicked() {
    this.o.emit('emitting message');
  }
}
