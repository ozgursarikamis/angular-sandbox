import { Component, inject } from '@angular/core';
import { CountStore } from 'src/store/CountStore';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false,
    // Provide the store for this component and its children
    providers: [CountStore]
})
export class AppComponent {
  title = undefined;

  readonly countStore = inject(CountStore);
}