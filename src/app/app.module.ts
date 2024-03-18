import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_GB } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient }                 from '@angular/common/http';
import { NzTabComponent, NzTabSetComponent } from "ng-zorro-antd/tabs";
import { NzStepComponent } from "ng-zorro-antd/steps"
import { NzModalComponent, NzModalService, }  from "ng-zorro-antd/modal";

import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSpaceModule } from 'ng-zorro-antd/space';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NzTabSetComponent,
    NzTabComponent,
    NzModalComponent,
    NzStepsModule,
    NzButtonModule,
    NzDrawerModule,
    NzSpaceModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_GB },
    provideAnimationsAsync(),
    provideHttpClient(),
    NzModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
