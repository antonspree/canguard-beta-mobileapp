import { axiosPublicInstance } from "@/lib/axios";

const signIn = async (data: any) => {
  try {
    const result = await axiosPublicInstance
      .post("/auth/login", { ...data })
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const signUp = async (data: any) => {
  try {
    const result = await axiosPublicInstance
      .post("/auth/register", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const forgotPass = async (data: any) => {
  try {
    const result = await axiosPublicInstance
      .post("/auth/forgot", { ...data })
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const resetPass = async (data: any) => {
  try {
    const result = await axiosPublicInstance
      .post("/auth/resetPass", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const changePass = async (data: any) => {
  try {
    const result = await axiosPublicInstance
      .post("/auth/changePass", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export { signIn, signUp, forgotPass, resetPass, changePass };
