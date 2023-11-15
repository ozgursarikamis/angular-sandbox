import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StandaloneAppComponent } from '../standalone-app.component'; 
@NgModule({
  declarations: [
    // AppComponent
  ],
  imports: [
    BrowserModule,
    StandaloneAppComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
