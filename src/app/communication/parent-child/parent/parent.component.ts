import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit, AfterViewInit {

  /*
    ! It means that angular is going to look for our target element only after
    ! the view has been created.
    ! in most of the cases this is the way you'll use it.
  */
  @ViewChild(ChildComponent, { static: false }) childComponent: ChildComponent;

  /*
   ! Accessing the DOM element in parent component
  */
  @ViewChild('accessId', { static: false }) accessId: ElementRef;

  constructor() { }
  ngAfterViewInit(): void {
    this.accessId.nativeElement.value = 'Tony Stark';
    this.childComponent.logGreet();

    const value = this.childComponent.greet(this.accessId.nativeElement.value);
    console.log('value:', value);
  }

  greet() {
    const value = this.childComponent.greet(this.accessId.nativeElement.value);
    console.log('value:', value);
  }

  ngOnInit() { }

}
