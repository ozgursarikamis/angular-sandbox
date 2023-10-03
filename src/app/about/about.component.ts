import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  mergeQueryString() {
    
  }

  readonly activatedRoute = inject(ActivatedRoute);
  readonly router = inject(Router);
  
  readonly pageQueryParam$ = this.activatedRoute.queryParamMap.pipe(
    map(queryParamMap => queryParamMap.get('page'))
  );


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
