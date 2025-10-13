import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PracticeOneComponent } from "./practice-one/practice-one.component";
import { PracticeTwoComponent } from "./practice-two/practice-two.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PracticeOneComponent,
    PracticeTwoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
