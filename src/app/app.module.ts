import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PracticeOneComponent } from "./practice-one/practice-one.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PracticeOneComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
