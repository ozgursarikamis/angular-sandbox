import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfigurationService }         from './shared/configuration/configuration.service';
import { AppUserAuth } from './security/app-user-auth';
import { SecurityService }                    from './shared/security/security.service';
import { map, Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = "JWT | Angular";
  securityObject: AppUserAuth | undefined;
  securityReset$: Observable<any> | undefined;

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
    // this.configService.getSettings().subscribe(
    //   settings => this.configService.settings = settings
    // );
    this.securityReset$ = this.securityService.securityReset$.pipe(
      map(() => {
        return this.updateProperties();
      }),
    );
  }

  private updateProperties() {
    this.canAccessProducts = this.securityService?.hasClaim("CanAccessProducts", "true") || false;
    this.canAccessCategories = this.securityService?.hasClaim("CanAccessCategories", "true") || false;
    this.canAccessSettings = this.securityService?.hasClaim("CanAccessSettings", "true") || false;
    this.canAccessLogs = this.securityService?.hasClaim("CanAccessLogs", "true") || false;

    return {
      canAccessProducts: this.canAccessProducts,
      canAccessCategories: this.canAccessCategories,
      canAccessSettings: this.canAccessSettings,
      canAccessLogs: this.canAccessLogs
    }
  }

  logOut() {
    this.securityService.logout();
    this.securityObject = this.securityService.securityObject;
  }

  ngOnDestroy(): void {
  }
}
