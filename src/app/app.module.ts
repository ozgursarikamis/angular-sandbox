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
import { PageHeaderComponent } from './page-header/page-header.component';
import { NzPageHeaderModule } from "ng-zorro-antd/page-header"
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { InputsComponent } from './inputs/inputs.component';
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from 'ng-zorro-antd/icon';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    InputsComponent
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
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzInputModule,
    NzIconModule
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
