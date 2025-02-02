import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {

  @Input() data!: string;
  cdr = inject(ChangeDetectorRef);

  updateManually(){
    setTimeout(() => {
      this.data = 'Updated by timeout';
      this.cdr.detectChanges(); // Manually trigger change detection
      console.log('%c[detectChanges] Manually triggered change detection', 'color: green;');
    }, 2000);
  }
}
