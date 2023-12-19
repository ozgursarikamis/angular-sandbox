import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiUrls } from '../strings';
import { User } from '../models/User';
import { Post } from '../models/Post';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CalcService {
  httpClient = inject(HttpClient);
  usersUrl = ApiUrls.Users;
  postsUrl = ApiUrls.Posts;

  multiply(a: number, b: number): number {
    return a * b;
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.usersUrl);
  }

  savePost(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(this.postsUrl, post);
  }

  // PUT /posts/1
  updatePost(post: Post): Observable<Post> {
    return this.httpClient.put<Post>(`${this.postsUrl}/${post.id}`, post);
  }

}
