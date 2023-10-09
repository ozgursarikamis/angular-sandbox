import { Component } from '@angular/core';
import { AppUser } from 'src/app/security/app-user';
import { AppUserAuth } from 'src/app/security/app-user-auth';
import { SecurityService } from '../security.service';
import { MessageService } from '../../messaging/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: AppUser = new AppUser();
  securityObject: AppUserAuth | undefined;

  constructor(
    private securitService: SecurityService,
    private messageService: MessageService,
  ) { }

  login() {
    this.securityObject?.init();
    this.securitService.login(this.user)
      .subscribe(resp =>  this.securityObject = resp);
  }
}
