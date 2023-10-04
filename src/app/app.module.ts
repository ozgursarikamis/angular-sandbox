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
import { NotReadyYetComponent } from './not-ready-yet/not-ready-yet.component';
import { ProfileComponent } from './profile/profile.component';
import { NotAuthorisedComponent } from './not-authorised/not-authorised.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    FeatureComponent,
    FeatureNewComponent,
    NotReadyYetComponent,
    ProfileComponent,
    NotAuthorisedComponent
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
