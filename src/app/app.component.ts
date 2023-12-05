import { Component } from '@angular/core';
import { Observable, finalize, of } from 'rxjs';
import { ApiService } from './services/api.service';
import { IPost } from './models/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Async Pipe & Loading Indicator';
  observable$: Observable<IPost[]> | undefined;
  loading = false;
  
  constructor(private apiService: ApiService) { }

  loadFromServer() {
    this.loading = true;
    this.observable$ = this.apiService
    .loadFromServer()
    .pipe(
      finalize(() => (this.loading = false))
    );
  }
}
