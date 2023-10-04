import { inject, NgModule }                                from '@angular/core';
import { PreloadAllModules, Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent }                                   from './home/home.component';

import { ComponentTwoComponent } from './component-two/component-two.component';
import { ComponentOneComponent } from './component-one/component-one.component';
import { ComponentAuxComponent } from './component-aux/component-aux.component';
import { FeatureComponent }      from "./feature/feature.component";
import { FeatureFlagService }    from "./feature-flag.service";
import { FeatureNewComponent }   from "./feature-new/feature-new.component";
import { NotReadyYetComponent }  from "./not-ready-yet/not-ready-yet.component";
import { map }                   from "rxjs";
import { AuthService }           from "./auth.service";
import { ProfileComponent }      from "./profile/profile.component";
import { NotAuthorisedComponent } from "./not-authorised/not-authorised.component";
import { PreloadService } from "./preload.service";

const ROUTE_TOKENS = {
  NotReadyYet: 'not-ready-yet',
}


function authRouteGuard(route: string) {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.permissions().pipe(
      map(permissions => permissions.includes(route) || router.parseUrl('not-authorised'))
    );
  }
}

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'component-one', component: ComponentOneComponent },
	{ path: 'component-two', component: ComponentTwoComponent },
	{ path: 'component-aux', component: ComponentAuxComponent, outlet: 'bottom-outlet' },
  {
    path: 'feature',
    component: FeatureNewComponent,
    canMatch: [() => {
      const featureService = inject(FeatureFlagService);
      return featureService.showNewerVersion(); // has to return actual boolean instead of truthy/falsy!
    }],
    resolve: {
      userInfo: () => { // userInfo is an @Input in the FeatureNewComponent !
        const preloadService = inject(PreloadService);
        return preloadService.someData();
      }
    }
  },
  {
    path: 'feature',
    component: FeatureComponent
  },
  {
    path: 'standalone',
    loadComponent: () => import('./standalone/standalone.component').then(m => m.StandaloneComponent),
    canActivate: [() => {
      const featureService = inject(FeatureFlagService);
      const route = inject(Router);

      return featureService.showStandalone().pipe(
        map(showStandalone => {
          return showStandalone || route.parseUrl(ROUTE_TOKENS.NotReadyYet);
        }
      ));
    }]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authRouteGuard('profile')]
  },
  {
    path: 'not-authorised',
    component: NotAuthorisedComponent
  },
  {
    path: ROUTE_TOKENS.NotReadyYet,
    component: NotReadyYetComponent
  },
  {
    path: 'lazy',
    loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule)
  }
];


@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, bindToComponentInputs: true })
	],
	exports: [],
})
export class AppRoutingModule { }
