import { Component, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  
  firstName = new FormControl();
  lastName = new FormControl();
  dateOfBirth = new FormControl();
  favoritesRanking = new FormControl();

  contactService = inject(ContactsService);
  route = inject(ActivatedRoute);

  constructor() { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return;

    this.contactService.getContact(contactId)
      .subscribe(contact => {
        this.firstName.setValue(contact?.firstName);
        this.lastName.setValue(contact?.lastName);
        this.dateOfBirth.setValue(contact?.dateOfBirth);
        this.favoritesRanking.setValue(contact?.favoritesRanking);
      });
  }

  saveContact() {
    console.log({
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      dateOfBirth: this.dateOfBirth.value,
      favoritesRanking: this.favoritesRanking.value,
    });
  }
}
