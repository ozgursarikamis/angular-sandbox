import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { Contact, addressTypeValues, phoneTypeValues } from '../contacts/contact.model';

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
    personal: false,
    firstName: ['', Validators.required],
    lastName: '',
    dateOfBirth: <Date | null>null, // except for dateOfBirth and favoritesRanking
    favoritesRanking: <number | null>null,
    address: this.formBuilder.nonNullable.group({
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: ''
    }),
    phone: this.formBuilder.nonNullable.group({
      phoneNumber: '',
      phoneType: ''
    }),
  });

  constructor() { }

  get firstName() {
    return this.contactForm?.controls?.firstName;
  }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return;

    this.contactService.getContact(contactId)
      .subscribe(contact => {

         if(!contact) return;
        
         this.contactForm.setValue(contact);
        });
  }

  saveContact() {
    const phoneTypesValue = this.contactForm.controls.phone.controls.phoneType?.value;
    console.log(phoneTypesValue);

    const rawValue = this.contactForm.getRawValue();
    this.contactService.saveContact(rawValue as Partial<Contact>)
      .subscribe({
        next: () => this.router.navigate(['/contacts']),
      });
  }
}
