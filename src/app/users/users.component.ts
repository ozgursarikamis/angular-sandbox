import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserStore } from 'src/store/UserStore';

@Component({
  selector: 'app-users',
  imports: [
    RouterLink,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  userStore = inject(UserStore);
  ngOnInit(): void {
    this.userStore.loadUsers(); 
  }
}
