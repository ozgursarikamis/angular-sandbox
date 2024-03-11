import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { OAuthModule } from 'angular-oauth2-oidc';

import { AppComponent } from './app.component';

import { AuthGithubComponent } from '../auth-components/github/auth-github.component';
import { AppRoutingModule }    from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { GithubService } from 'src/services/github.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthGithubComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    OAuthModule.forRoot()
  ],
  providers: [
    GithubService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
