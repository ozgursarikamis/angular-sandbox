import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { Contact } from '../contacts/contact.model';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  
  contactService = inject(ContactsService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);

  // When constructing a control, it will be non-nullable, 
  // and will reset to its initial value.
  contactForm = this.formBuilder.nonNullable.group({
    id: '',
    firstName: '',
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

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return;

    this.contactService.getContact(contactId)
      .subscribe(contact => {

         if(!contact) {
          return;
         }

        // this.contactForm.controls.id.setValue(contact.id);
        // this.contactForm.controls.firstName.setValue(contact.firstName);
        // this.contactForm.controls.lastName.setValue(contact.lastName);
        // this.contactForm.controls.dateOfBirth.setValue(contact.dateOfBirth ?? null);
        // this.contactForm.controls.favoritesRanking.setValue(contact.favoritesRanking ?? null);

        // this.contactForm.controls.phone.controls.phoneNumber?.setValue(contact.phone.phoneNumber);
        // this.contactForm.controls.phone.controls.phoneType?.setValue(contact.phone.phoneType);

        // this.contactForm.controls.address.controls.streetAddress?.setValue(contact.address.streetAddress);
        // this.contactForm.controls.address.controls.city?.setValue(contact.address.city);
        // this.contactForm.controls.address.controls.state?.setValue(contact.address.state);
        // this.contactForm.controls.address.controls.postalCode?.setValue(contact.address.postalCode);
        // this.contactForm.controls.address.controls.addressType?.setValue(contact.address.addressType);

        // what if we didn't initialize the whole form with values: 
        const names = { firstName: contact.firstName, lastName: contact.lastName };
        // this.contactForm.setValue(names); // won't work
        this.contactForm.patchValue(names); // works
      });
  }

  saveContact() {
    console.log(this.contactForm.value);
    console.log(this.contactForm.getRawValue()); // The aggregate value of the FormGroup, including any disabled controls.

    const rawValue = this.contactForm.getRawValue();
    this.contactService.saveContact(rawValue as Partial<Contact>)
      .subscribe({
        next: () => this.router.navigate(['/contacts']),
      });
  }
}
