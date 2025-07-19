import { Component, computed } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = "Signals";

  z = computed(() => this.x() + this.y());

  x = computed(() => 1);
  y = computed(() => 2)
}
