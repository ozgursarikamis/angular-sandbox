import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { ComponentTwoComponent } from './component-two/component-two.component';
import { ComponentOneComponent } from './component-one/component-one.component';
import { ComponentAuxComponent } from './component-aux/component-aux.component';


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


@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [],
})
export class AppRoutingModule { }
