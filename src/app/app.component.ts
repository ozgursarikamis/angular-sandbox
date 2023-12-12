import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'End-to-end Testing with Cypress';

  onFilter(value: string): void {
    console.log(value);
  }
}
