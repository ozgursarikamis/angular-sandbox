import { UserAuthBase } from "../shared/security/user-auth-base";

export class AppUserAuth extends UserAuthBase {
    CanAccessProducts: boolean = false;
    CanAccessCategories: boolean = false;
    CanAccessLogs: boolean = false;
    CanAccessSettings: boolean = false;
    CanAddProduct: boolean = false;
    CanEditProduct: boolean = false;
    CanDeleteProduct: boolean = false;

    override init(): void {
        super.init();
        this.CanAccessProducts = false;
        this.CanAccessCategories = false;
        this.CanAccessLogs = false;
        this.CanAccessSettings = false;
        this.CanAddProduct = false;
        this.CanEditProduct = false;
        this.CanDeleteProduct = false;
    }
}
