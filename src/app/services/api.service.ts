import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPost } from '../models/post';
import { Observable, delay } from 'rxjs';

@Injectable()
export class ApiService {
	constructor(private httpClient: HttpClient) { }

	loadFromServer(): Observable<IPost[]> {
		const URL = 'https://jsonplaceholder.typicode.com/posts';
		return this.httpClient.get<IPost[]>(URL)
			.pipe(delay(1000));
	}
}