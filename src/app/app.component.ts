import { DOCUMENT } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService],
})
export class AppComponent {
  title = " Auth0 & Angular";
  authService = inject(AuthService);
  constructor(
    @Inject(DOCUMENT) private doc: Document
  ) {
    // document.title = this.title;
    this.doc.title = this.title;
  }

  onLoginButtonClick() {
    this.authService.loginWithRedirect();
  }

  onLogoutButtonClick() {
    this.authService.logout({ logoutParams: { returnTo: document.location.origin } });
  }
}
