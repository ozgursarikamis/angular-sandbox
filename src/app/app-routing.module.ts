import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGithubComponent }  from 'src/auth-components/github/auth-github.component';
import { HomeComponent }        from './components/home/home.component';
import { AuthAppleComponent } from "../auth-components/apple/auth-apple.component";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'sso/callback/github', component: AuthGithubComponent },
    { path: 'sso/callback/apple', component: AuthAppleComponent },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
