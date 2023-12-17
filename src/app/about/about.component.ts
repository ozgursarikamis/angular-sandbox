import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  location = inject(Location);

  goBack() {
    this.location.back();
  }
}
