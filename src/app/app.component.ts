import { Component } from '@angular/core';
import { StandaloneAppComponent } from "../standalone-app.component";

@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [StandaloneAppComponent]
})
export class AppComponent {
  title = undefined;
}
