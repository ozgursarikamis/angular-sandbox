import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PracticeOneComponent } from "./practice-one/practice-one.component";
import { PracticeTwoComponent } from "./practice-two/practice-two.component";
import { PracticeThreeComponent } from "./practice-three/practice-three.component";
import { PracticeFourComponent } from "./practice-four/practice-four.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PracticeOneComponent,
    PracticeTwoComponent,
    PracticeThreeComponent,
    PracticeFourComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
