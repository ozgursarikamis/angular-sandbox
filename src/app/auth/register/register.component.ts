import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LogoComponent } from "src/app/shared/logo/logo.component";
import { SocialIconsComponent } from "src/app/shared/social-icons/social-icons.component";

@Component({
  selector: 'app-register',
  imports: [RouterLink, LogoComponent, FormsModule, SocialIconsComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  get passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  get isFormValid(): boolean {
    return this.email !== '' && this.password !== '' && this.confirmPassword !== '' && this.passwordsMatch;
  }

  onSubmit() {
    if (this.isFormValid) {
      console.log('Register attempt:', { email: this.email });
    }
  }
}
