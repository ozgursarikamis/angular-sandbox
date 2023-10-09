import { Component } from '@angular/core';
import { ConfigurationService } from './shared/configuration/configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "JWT | Angular";

  constructor(
    private configService: ConfigurationService,
  ) { }

  ngOnInit() {
    this.configService.getSettings().subscribe(
      settings => this.configService.settings = settings
    );
  }

  logOut() {
    
  }
}
