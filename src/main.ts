import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { ForgotPasswordComponent } from "./app/auth/forgot-password/forgot-password.component";
import { LoginComponent } from "./app/auth/login/login.component";
import { RegisterComponent } from "./app/auth/register/register.component";
import { provideRouter } from "@angular/router";

const routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' as const },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
});
