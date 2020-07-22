import { Component, OnInit, Input,  Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child2',
  templateUrl: './child2.component.html',
  styleUrls: ['./child2.component.scss']
})
export class Child2Component implements OnInit {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() myEmitter = new EventEmitter<string>();
  @Input() inputParameter: string;

  constructor() { }

  ngOnInit() {
    console.log('this.inputParameter', this.inputParameter);
  }

  emit(name: string) {
    this.myEmitter.emit(name);
  }
}
