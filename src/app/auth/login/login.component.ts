import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocialIconsComponent } from "src/app/shared/social-icons/social-icons.component";
import { LogoComponent } from "src/app/shared/logo/logo.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [SocialIconsComponent, FormsModule, LogoComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    console.log('Login attempt:', { username: this.username });
  }
}
