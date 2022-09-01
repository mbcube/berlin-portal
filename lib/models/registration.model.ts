export interface RegistrationBase {
  fullName: string;
  email: string;
  phone: number;
  address: string;
  comments: string;
}

export interface Registration extends RegistrationBase {
  resume: File[];
}

export interface RegistrationItem extends RegistrationBase {
  createdDate: string;
  resume: string;
}

export interface RegistrationDocument {
  registration: RegistrationItem[];
}
