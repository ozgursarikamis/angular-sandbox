import { Component } from '@angular/core';
import { FileSizePipe } from '../pipes/file-size.pipe';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  contacts: boolean | null | undefined;
}
