import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  readonly activatedRoute = inject(ActivatedRoute);
  readonly router = inject(Router);

  constructor() { }
  
  relativeToClicked() {
    console.log('relativeToClicked');
  }

  routeClicked() {
    console.log('routeClicked');
    this.router.navigate(['../home'], { relativeTo: this.activatedRoute });
    // this.router.navigate(['../home']);
  }

}
