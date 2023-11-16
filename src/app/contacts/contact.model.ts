export interface Contact {
  id: string,
  firstName: string,
  lastName: string,
  dateOfBirth: Date | null,
  favoritesRanking: number | null,
  phone: Phone,
  address: Address,
}

export interface Phone {
  phoneNumber: string,
  phoneType: string,
}

export interface Address {
  streetAddress: string,
  city: string,
  state: string,
  postalCode: string,
  addressType: string,
}

export const phoneTypeValues = [
  { title: 'Home', value: 'home' },
  { title: 'Work', value: 'work' },
  { title: 'Mobile', value: 'mobile' },
  { title: 'Other', value: 'other' },
];