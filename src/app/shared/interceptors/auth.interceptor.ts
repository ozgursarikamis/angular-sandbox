import { Injectable }                                           from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable }                                           from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth = undefined;
    let value = localStorage.getItem("AuthObject");
    if (value) {
      auth = JSON.parse(value);
    }

    if (auth) {
      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.

      const authRequest = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + auth.BearerToken)
      });

      // send cloned request with header to the next handler.
      return next.handle(authRequest);
    } else {
      return next.handle(req);
    }
  }
}
