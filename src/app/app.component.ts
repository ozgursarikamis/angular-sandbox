import { Component } from '@angular/core';
import { ConfigurationService } from './shared/configuration/configuration.service';
import { AppUserAuth } from './security/app-user-auth';
import { SecurityService } from './shared/security/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "JWT | Angular";
  securityObject: AppUserAuth | undefined;

  canAccessProducts: boolean = false;
  canAccessCategories: boolean = false;
  canAccessSettings: boolean = false;
  canAccessLogs: boolean = false;

  constructor(
    private configService: ConfigurationService,
    private securityService: SecurityService
  ) {
    this.securityObject = this.securityService.securityObject;
  }

  ngOnInit() {
    this.configService.getSettings().subscribe(
      settings => this.configService.settings = settings
    );
  }

  logOut() {
    this.securityService.logout();
    this.securityObject = this.securityService.securityObject;
  }
}
