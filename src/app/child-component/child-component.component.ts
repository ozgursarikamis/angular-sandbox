import { ChangeDetectionStrategy, Component, DoCheck, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrl: './child-component.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponentComponent implements OnChanges, DoCheck {
  
  // Called during every change detection run.
  ngDoCheck() {
    console.log('%c[ngDoCheck] Change detection triggered in app-child', 'color: red;');
  }

  @Input() data!: string;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('%c[ngOnChanges] Change detected in app-child', 'color: orange;', changes);
  }
}
