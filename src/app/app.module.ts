import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InMemoryContactsApi } from './contacts/in-memory-contacts.service';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    EditContactComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryContactsApi, { delay: 200 }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
