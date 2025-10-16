import { Component } from '@angular/core';
import { ChildComponent } from "../child/child.component";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
  imports: [ChildComponent]
})
export class ParentComponent {
  writeMessage($event: string) {
    this.message = $event;
  }
  message: string = '';
}
