import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }       from './app.component';
import { AppRoutingModule }   from './app.routing.module';
import { RouterModule }       from '@angular/router';
import { AboutComponent }     from './about/about.component';
import { HomeComponent }      from './home/home.component';
import { HttpClientModule }   from "@angular/common/http";
import { FeatureFlagService } from "./feature-flag.service";
import { FeatureComponent } from './feature/feature.component';
import { FeatureNewComponent } from './feature-new/feature-new.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    FeatureComponent,
    FeatureNewComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [
    FeatureFlagService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
