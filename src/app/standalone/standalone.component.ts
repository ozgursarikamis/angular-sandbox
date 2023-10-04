import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-standalone',
  standalone: true, // <-- Standalone component
  imports: [CommonModule],
  templateUrl: './standalone.component.html',
  styleUrls: ['./standalone.component.css']
})
export class StandaloneComponent {

  readonly httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.httpClient.get("https://jsonplaceholder.typicode.com/todos/1")
      .subscribe((response) => {
        console.log(response);
      });
  }

}
