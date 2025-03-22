import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from "./search/search.component";
import { Search2Component } from "./search2/search2.component";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    Search2Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
