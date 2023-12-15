import { Component } from '@angular/core';
import { SubtitleDirective }              from './subtitle.directive';

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
}
