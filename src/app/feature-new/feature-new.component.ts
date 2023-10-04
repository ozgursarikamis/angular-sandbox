import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-new',
  templateUrl: './feature-new.component.html',
  styleUrls: ['./feature-new.component.css']
})
export class FeatureNewComponent {

  @Input() userInfo: { Name: string, Age: number } | undefined;
}
