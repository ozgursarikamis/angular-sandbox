import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthService }  from 'angular-oauth2-oidc';
import { GithubService } from 'src/services/github.service';

@Component({
  selector: 'app-auth-components',
  templateUrl: './auth-github.component.html',
  styleUrl: './auth-github.component.css'
})
export class AuthGithubComponent implements OnInit {

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  githubService = inject(GithubService);
  oauthService = inject(OAuthService);

  accessToken$: any;

  async ngOnInit(): Promise<void> {
    const authCode = this.activatedRoute.snapshot.queryParams['code'];
    console.log('authCode', authCode);
   this.accessToken$ = this.githubService.getAccessToken(authCode);
  }
}
