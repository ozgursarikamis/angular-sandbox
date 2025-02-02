import { ChangeDetectorRef, Component, inject } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {
  data = 'Static Data';
  private isDetached = false;

  changeDetectorRef = inject(ChangeDetectorRef);

  toggleChangeDetection() {
    if(this.isDetached) {
      this.changeDetectorRef.reattach();
      console.log('%c[reattach] Change detection re-enabled', 'color: blue;');
    } else {
      this.changeDetectorRef.detach();
      console.log('%c[detach] Change detection disabled', 'color: red;');
    }
    this.isDetached = !this.isDetached;
  }
}
