import { Inject, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FileSizePipe } from './pipes/file-size.pipe';

// Define a new DI Token:
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config'); // `app.config` is the name of the token

export interface AppConfig {
  appTitle: string;
  apiEndpoint: string;
}

@NgModule({
  declarations: [
    AppComponent,
    FileSizePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: {
        appTitle: 'Interview Questions',
        apiEndpoint: 'http://localhost:3000'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    console.log(config);
  }
}