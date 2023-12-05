export interface Contact {
  id: string,
  icon: string,
  personal: boolean,
  firstName: string,
  lastName: string,
  dateOfBirth: Date | null,
  favoritesRanking: number | null,
  phones: Phone[],
  address: Address,
}

export interface Phone {
  phoneNumber: string,
  phoneType: string,
  preferred: boolean,
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

export const addressTypeValues = [
  { title: 'Home', value: 'home' },
  { title: 'Work', value: 'work' },
  { title: 'Other', value: 'other' },
  { title: 'Other 2', value: 'other 2' },
];