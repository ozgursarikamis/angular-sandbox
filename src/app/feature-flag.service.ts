import { Injectable }     from '@angular/core';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {

  constructor() { }

  showNewerVersion(): Observable<boolean> {
    // return of(false);
    return of(true);
  }

  showStandalone() {
    return of(false);
  }
}
