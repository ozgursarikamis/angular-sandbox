import { Component } from '@angular/core';
import { profileIconNames } from '../profile-icon-names';

@Component({
  selector: 'app-profile-icon-selector',
  templateUrl: './profile-icon-selector.component.html',
  styleUrl: './profile-icon-selector.component.css'
})
export class ProfileIconSelectorComponent {
  profileIcons = profileIconNames;
}
