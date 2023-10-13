export class UserAuthBase {
    UserName: string = "";
    BearerToken: string = "";
    IsAuthenticated: boolean = false;

    init(): void {
        this.UserName = "";
        this.BearerToken = "";
        this.IsAuthenticated = false;
    }
}
