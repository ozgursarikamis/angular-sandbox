import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { addressTypeValues, phoneTypeValues } from '../contacts/contact.model';
import { restrictedWords } from '../validators/restricted-words.validator';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  phoneTypes = phoneTypeValues;
  addressTypes = addressTypeValues;

  contactService = inject(ContactsService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);

  // When constructing a control, it will be non-nullable, 
  // and will reset to its initial value.
  contactForm = this.formBuilder.nonNullable.group({
    id: '',
    icon: '',
    personal: false,
    firstName: ['', [Validators.required, restrictedWords()]],
    lastName: ['', [Validators.required, restrictedWords(['me', 'you', 'us', 'them'])]],
    dateOfBirth: <Date | null>null, // except for dateOfBirth and favoritesRanking
    favoritesRanking: <number | null>null,
    address: this.formBuilder.nonNullable.group({
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: ''
    }),
    phones: this.formBuilder.array([this.createPhoneGroup()])
  });

  createPhoneGroup() {
    return this.formBuilder.nonNullable.group({
      phoneNumber: '',
      phoneType: '', 
      preferred: false,
    });
  }

  constructor() { }

  get firstName() {
    return this.contactForm?.controls?.firstName;
  }
  get lastName() {
    return this.contactForm?.controls?.lastName;
  }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return;

    this.contactService.getContact(contactId)
      .subscribe(contact => {

        if (!contact) return;

        for (let i = 1; i < contact.phones.length; i++) {
          this.addPhoneFormElement();
        }
        this.contactForm.setValue(contact);
      });
  }

  saveContact() {
    console.log(this.contactForm.value.dateOfBirth, typeof this.contactForm.value.dateOfBirth);
    this.contactService.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/contacts'])
    });
  }

  addPhoneFormElement() {
    this.contactForm.controls.phones.push(this.createPhoneGroup());
  }
}