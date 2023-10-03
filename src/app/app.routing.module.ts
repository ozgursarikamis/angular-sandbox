import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
	{
		path: 'home',
		component: AppComponent,
	},
	{
		path: 'about',
		component: AboutComponent,
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [],
})
export class AppRoutingModule { }