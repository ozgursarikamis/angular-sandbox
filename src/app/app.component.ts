import { Component, inject } from '@angular/core';
import { SubtitleDirective } from './subtitle.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  hostDirectives: [
    SubtitleDirective // to import a standalone directive
  ],
  standalone: false
})
export class AppComponent {
  title = "Interview Questions";
  contacts: boolean | null | undefined;

  rotuer = inject(Router);

  constructor() {
    this.rotuer.events.subscribe({
      next: (event) => {
        console.log(event);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
