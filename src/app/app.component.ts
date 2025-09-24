import { Component, inject, OnInit } from '@angular/core';
import { CountStore } from 'src/store/CountStore';
import { UserStore } from 'src/store/UserStore';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false,
    // Provide the store for this component and its children
    providers: [CountStore, UserStore]
})
export class AppComponent implements OnInit {
  title = undefined;

  readonly countStore = inject(CountStore);
  readonly userStore = inject(UserStore);

  ngOnInit(): void {
    this.userStore.loadUsers(); 
  }
}