import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable }                                       from '@angular/core';
import { Observable, catchError, of, tap, BehaviorSubject } from 'rxjs';
import { AppUser }                                          from 'src/app/security/app-user';
import { AppUserAuth } from 'src/app/security/app-user-auth';
import { MessageService } from '../messaging/message.service';
import { ConfigurationService } from '../configuration/configuration.service';

const API_ENDPOINT = 'security/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({ providedIn: 'root' })
export class SecurityService {
    securityObject: AppUserAuth = new AppUserAuth();
    apiUrl: string = "";
    private hasChanged = new BehaviorSubject<number>(0);
    securityReset$ = this.hasChanged.asObservable();

    constructor(
        private httpClient: HttpClient,
        private messageService: MessageService,
        private configService: ConfigurationService
    ) {
        this.apiUrl = this.configService.settings?.apiUrl + API_ENDPOINT;
    }

    login(entity: AppUser): Observable<AppUserAuth> {
        delete entity.userId;

        return this.httpClient.post<AppUserAuth>(this.apiUrl + 'login', entity, httpOptions)
            .pipe(
                tap(resp => {
                    Object.assign(this.securityObject, resp);
                    localStorage.setItem('AuthObject', resp ? JSON.stringify(resp) : '');

                    // Inform everyone that security object has changed:
                    this.hasChanged.next(1); // any number works.
                }),
                catchError(this.handleError<AppUserAuth>('login', 'Invalid user id/password', new AppUserAuth()))
            )
    }

    logout(): void {
        this.securityObject.init();
        this.hasChanged.next(0); // any number works.
    }


  private handleError<T>(operation = 'operation', msg = '', result?: T) {
    // Add error messages to message service
    return (error: any): Observable<T> => {
      // Clear any old messages
      this.messageService.clearExceptionMessages();
      this.messageService.clearValidationMessages();

      msg = "Status Code: " + error.status + " - " + msg || "";

      console.log(msg + " " + JSON.stringify(error));

      // Set the last exception generated
      this.messageService.lastException = error;

      switch (error.status) {
        case 400:  // Model State Error
          if (error.error) {
            // Add all error messages to the validationMessages list
            Object.keys(error.error.errors)
              .map(keyName => this.messageService
                .addValidationMessage(error.error.errors[keyName][0]));
            // Reverse the array so error messages come out in the right order
            this.messageService.validationMessages = this.messageService.validationMessages.reverse();
          }
          break;
        case 404:
          this.messageService.addExceptionMessage(msg);
          break;
        case 500:
          this.messageService.addExceptionMessage(error.error);
          break;
        case 0:
          this.messageService.addExceptionMessage(
            "Unknown error, check to make sure the Web API URL can be reached." + " - ERROR: " + JSON.stringify(error));
          break;
        default:
          this.messageService.addException(error);
          break;
      }

      // Return default configuration values
      return of(result as T);
    };
  }

  hasClaim(claimType: any, claimValue?: any): boolean {
      let ret: boolean = false;

      if (typeof claimType === 'string') {
          ret = this.isClaimValid(claimType, claimValue);
      } else {
          let claims: string[] = claimType;
          if (claims) {
              for (let index = 0; index < claims.length; index++) {
                  ret = this.isClaimValid(claims[index]);

                  // if one is successful, let them in:
                  if (ret) {
                      break;
                  }
              }
          }
      }

      return ret;
  }

  private isClaimValid(claimType: string, claimValue?: string): boolean {
    let ret: boolean = false;
    let auth: AppUserAuth | undefined;

    // Retrieve security object
    auth = this.securityObject;
    if (auth) {
      // See if the claim type has a value
      // *hasClaim="'claimType:value'"
      if (claimType.indexOf(":") >= 0) {
        let words: string[] = claimType.split(":");
        claimType = words[0].toLowerCase();
        claimValue = words[1];
      }
      else {
        claimType = claimType.toLowerCase();
        // Either get the claim value, or assume 'true'
        claimValue = claimValue ? claimValue : "true";
      }
      // Attempt to find the claim
      ret = auth.UserClaims.find(c =>
        c.ClaimType.toLowerCase() === claimType &&
        c.ClaimValue === claimValue) != null;
    }

    console.log("Claim Type: " + claimType + " - Claim Value: " + claimValue + " - Has Claim: " + ret);
    return ret;
  }
}
