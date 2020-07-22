import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentComponent } from './communication/parent-child/parent/parent.component';
import { ChildComponent } from './communication/parent-child/child/child.component';
import { HelloComponent } from './communication/hello/hello.component';

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    ChildComponent,
    HelloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
