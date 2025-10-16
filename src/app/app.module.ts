import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DeferrableViewsComponent } from './deferrable-views/deferrable-views.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DeferrableViewsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
