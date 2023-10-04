import { NgModule } from '@angular/core';
import { PreloadAllModules, provideRouter, RouterModule, Routes, withPreloading } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { ComponentTwoComponent } from './component-two/component-two.component';
import { ComponentOneComponent } from './component-one/component-one.component';
import { ComponentAuxComponent } from './component-aux/component-aux.component';
import { ApplicationConfig } from "@angular/platform-browser";


export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'component-one', component: ComponentOneComponent },
	{ path: 'component-two', component: ComponentTwoComponent },
	{ path: 'component-aux', component: ComponentAuxComponent, outlet: 'bottom-outlet' },
  {
    path: 'standalone',
    loadComponent: () => import('./standalone/standalone.component').then(m => m.StandaloneComponent)
  },
  {
    path: 'lazy',
    loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule)
  }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules))
  ],
}


@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [],
})
export class AppRoutingModule { }
