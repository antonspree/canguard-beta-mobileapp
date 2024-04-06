import { axiosPublicInstance } from "@/utils/axios";

import { SignInFormDataType, SignUpFormDataType } from "@/types/auth";

const signIn = async (data: SignInFormDataType) => {
  try {
    const result = await axiosPublicInstance
      .post("/auth/login", { ...data })
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const signUp = async (data: SignUpFormDataType) => {
  try {
    const result = await axiosPublicInstance
      .post("/auth/register", { ...data })
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export { signIn, signUp };
