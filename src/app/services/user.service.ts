import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

@Injectable({ providedIn: 'root' })
export class UserService {
    private httpClient: HttpClient = inject(HttpClient);

    getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(USERS_URL);
    }
}