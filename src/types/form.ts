interface SignInFormDataType {
  email: string;
  password: string;
}

interface SignUpFormDataType {
  email: string;
  password: string;
}

interface RegisterFormDataType {
  username: string;
  birth: string;
}

interface CreateClubFormDataType {
  clubname: string;
  street: string;
  address: string;
  postcode: string;
  city: string;
  country: string;
  description: string;
}

export {
  SignInFormDataType,
  SignUpFormDataType,
  RegisterFormDataType,
  CreateClubFormDataType,
};
