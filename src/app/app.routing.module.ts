import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { ComponentTwoComponent } from './component-two/component-two.component';
import { ComponentOneComponent } from './component-one/component-one.component';
import { ComponentAuxComponent } from './component-aux/component-aux.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'component-one', component: ComponentOneComponent },
	{ path: 'component-two', component: ComponentTwoComponent },
	{ path: 'component-aux', component: ComponentAuxComponent, outlet: 'bottom-outlet' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [],
})
export class AppRoutingModule { }