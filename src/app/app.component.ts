import { Component, inject } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

/*
GitHub does provide a JWT (JSON Web Token) after OAuth login.
However, it's important to note that the token is not provided directly after the OAuth login.
Instead, after a successful OAuth login, GitHub provides an authorization code.
This authorization code can then be exchanged for an access token by making a POST request
to GitHub's token endpoint.

This access token can then be used to make authenticated requests on behalf of the user.
*/
export const githubCodeFlowConfig: AuthConfig = {
  loginUrl: 'https://github.com/login/oauth/authorize',
  redirectUri: 'http://localhost:4200/sso/callback/github',
  clientId: '37d9e8d5f858cb5f7739',
  responseType: 'code',
  scope: 'user:email',
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
    this.oauthService.configure(githubCodeFlowConfig);
    // this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.initCodeFlow();
    // this.oauthService.initImplicitFlowInPopup();
  }
}
