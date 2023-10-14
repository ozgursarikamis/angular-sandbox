import { UserAuthBase }  from "../shared/security/user-auth-base";
import { AppUserClaims } from "../shared/security/app-user-claims";

export class AppUserAuth extends UserAuthBase {

  claims: AppUserClaims[] = [];

  override init(): void {
    super.init();

  }

  getValueOfProperty(obj: any, key: string) : boolean {
    return obj[key];
  }
}
