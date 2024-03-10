import { Component, inject } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider: In this case it's github:
  // issuer: 'https://github.com/login/oauth/authorize',
  // customQueryParams: {
  //   // This is the scope we request.
  //   // GitHub API: https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/
  //   scope: 'user:email'
  // },

  loginUrl: 'https://github.com/login/oauth/authorize',

  // URL of the SPA to redirect the user to after login
  // redirectUri: window.location.origin + '/sso/github_oauth/api_callback' + '/index.html',
  redirectUri: 'http://localhost:4200',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: '464463739f616ff2f506',

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  // dummyClientSecret: 'secret',

  responseType: 'code',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'user read:user',
  strictDiscoveryDocumentValidation: false,

  showDebugInformation: true,
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "Angular | OAuth Signin";
  oauthService = inject(OAuthService);

  initCodeFlow() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.initCodeFlow();
  }
}
