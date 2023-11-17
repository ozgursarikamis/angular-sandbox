import { Component, forwardRef } from '@angular/core';
import { profileIconNames } from '../profile-icon-names';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const PROFILE_ICON_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProfileIconSelectorComponent),
  multi: true
};

@Component({
  selector: 'app-profile-icon-selector',
  templateUrl: './profile-icon-selector.component.html',
  styleUrl: './profile-icon-selector.component.css',
  providers: [PROFILE_ICON_VALUE_ACCESSOR]
})
export class ProfileIconSelectorComponent implements ControlValueAccessor {

  private onChange!: Function;
  private onTouched!: Function;

  writeValue(icon: any): void {
    this.selectedIcon = icon;
    if (icon && icon !== '') {
      this.showAllIcons = false;
    }
    else
      this.showAllIcons = true;
  }
  registerOnChange(fn: Function): void {
    this.onChange = (icon: string) => {
      fn(icon);
    }
  }
  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }
  
  profileIcons = profileIconNames;
  showAllIcons: boolean = true;
  selectedIcon!: string | null;

  iconSelected(icon: string) {
    this.showAllIcons = false;
    this.selectedIcon = icon;
    this.onChange(icon);
  }
}
