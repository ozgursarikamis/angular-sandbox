import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LogoComponent } from 'src/app/shared/logo/logo.component';
import { SocialIconsComponent } from 'src/app/shared/social-icons/social-icons.component';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink, FormsModule, CommonModule, LogoComponent, SocialIconsComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  emailOrUsername = '';
  submitted = false;

  onSubmit() {
    this.submitted = true;
    console.log('Password reset requested for:', this.emailOrUsername);
  }
}
