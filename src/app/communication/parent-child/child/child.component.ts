import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  userName: string;
  constructor() { }
  ngOnInit() { }

  logGreet() {
    console.log('Greetings People!');
  }

  greet(name: string) {
    return `Hello ${name} :)`;
  }

  updateUserName(): void {
    this.userName = 'Mayank';
  }
}
