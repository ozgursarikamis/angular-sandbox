import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewHooksComponent } from './new-hooks/new-hooks.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NewHooksComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
