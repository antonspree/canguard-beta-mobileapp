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

interface ChannelFormSchema {
  channelname: string;
  channeldesc: string;
}

interface ChatFormSchema {
  message: string;
}

interface ClubProfileFormSchema {
  clubname: string;
  website: string;
  email: string;
  phone: string;
  street: string;
  address: string;
  postcode: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  description: string;
  prevent_info: string;
  discord: string;
  tiktok: string;
  youtube: string;
  twitch: string;
  instagram: string;
  twitter: string;
  facebook: string;
  imprint: string;
  maxUser: number;
  minAge: number;
}

export {
  SignInFormDataType,
  SignUpFormDataType,
  RegisterFormDataType,
  CreateClubFormDataType,
  ChannelFormSchema,
  ChatFormSchema,
  ClubProfileFormSchema,
};
