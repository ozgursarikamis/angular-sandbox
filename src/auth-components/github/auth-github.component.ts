import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from 'src/services/github.service';

@Component({
  selector: 'app-auth-components',
  templateUrl: './auth-github.component.html',
  styleUrl: './auth-github.component.css'
})
export class AuthGithubComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  githubService = inject(GithubService);

  accessToken$: any;

  ngOnInit() {
    const authCode = this.activatedRoute.snapshot.queryParams['code'];
    console.log('authCode from Github', authCode);
    this.githubService.authorizeUser(authCode).subscribe();
  }
}
