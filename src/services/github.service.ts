import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GithubService {
    httpClient = inject(HttpClient);

    getAccessToken(authCode: string) {
        const clientId = '37d9e8d5f858cb5f7739';
        const clientSecret = 'a1f0cf37c65e375aa0dff319fcca554efbd9668e';
        // const redirectUri = 'http://localhost:4200/sso/callback/github';
        const tokenUrl = 'https://github.com/login/oauth/access_token';

        const requestBody = {
            client_id: clientId,
            client_secret: clientSecret,
            code: authCode,
            // redirect_uri: redirectUri
        };

        const headers = {
            // 'Access-Control-Allow-Origin': '*',
            'User-Agent': 'SponsorMap DEV',
            'Content-Type': 'application/json',
            'Accept': 'application/json' // ensure that the response is in JSON format
        };

        return this.httpClient.post(tokenUrl, requestBody, { headers });
    }

    getUserInfo(codeAfterSignIn: string): Observable<any> {
        // Set up the HTTP headers with the access token
        const headers = new HttpHeaders().set('Authorization', `Bearer ${codeAfterSignIn}`);
    
        // Define the URL for fetching user information
        const apiUrl = 'https://api.github.com/user';
    
        // Make the HTTP GET request to fetch user information
        return this.httpClient.get(apiUrl, { headers });
      }
}