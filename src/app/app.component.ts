import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Forms to Query String';
  router = inject(Router);

  form = new FormGroup({
    Name: new FormControl<string>(''),
    LastName: new FormControl<string>(''),
    IsAdult: new FormControl<boolean>(false),
    Selections: new FormControl<string[]>([])
  });

  formSubmitted() {
    const formValue = this.form.value;
    console.log('form value', formValue);
    this.router.navigate([], { queryParams: formValue, queryParamsHandling: 'merge' });
  }
}
