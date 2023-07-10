import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WithLoadingPipe } from './pipes/with-loading.pipe';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    WithLoadingPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    WithLoadingPipe,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
