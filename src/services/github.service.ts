import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GithubService {
    httpClient = inject(HttpClient);

    /**
     * Fetches user information from the GitHub API.
     * @param accessToken - The access token for authentication.
     * @returns An Observable that emits the user information.
     */
    getUserInfo(accessToken: string): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        const apiUrl = 'https://api.github.com/user';
        return this.httpClient.get(apiUrl, { headers });
    }

    /**
     * Authorizes a user using a GitHub authentication code.
     * @param authCode - The authentication code.
     * @returns An Observable that emits the response from the API.
     */
    authorizeUser(authCode: any): Observable<any> {
        const url = 'http://localhost:5000/api/auth/github' + '?code=' + authCode;
        return this.httpClient.get(url);
    }
}