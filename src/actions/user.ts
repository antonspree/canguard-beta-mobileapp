import { axiosPrivateInstance } from "@/lib/axios";

const getData = async () => {
  try {
    const result = await axiosPrivateInstance
      .get("/user/getData")
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const getUser = async () => {
  try {
    const result = await axiosPrivateInstance
      .get("/user")
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/user/update", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const cancelRequest = async () => {
  try {
    const result = await axiosPrivateInstance
      .get("/user/cancel")
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const terminateMember = async () => {
  try {
    const result = await axiosPrivateInstance
      .get("/user/terminate")
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const removeAccount = async () => {
  try {
    const result = await axiosPrivateInstance
      .get("/user/remove")
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const confirmPass = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/user/confirmPass", { ...data })
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const twoFARequest = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/user/twoFARequest", { ...data })
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export {
  getData,
  getUser,
  updateUser,
  cancelRequest,
  terminateMember,
  removeAccount,
  confirmPass,
  twoFARequest,
};
