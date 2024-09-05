import { axiosPrivateInstance, axiosPublicInstance } from "@/lib/axios";

const getAllClubs = async () => {
  try {
    const result = await axiosPrivateInstance
      .get("/club/all")
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const getClubOfLimit = async (page: number, limit: number) => {
  try {
    const result = await axiosPrivateInstance
      .get("/club/fetch")
      .then((res) => res);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const getClub = async () => {
  try {
    const result = await axiosPrivateInstance
      .get("/club")
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const createClub = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/club/create", { ...data })
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const joinClub = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/club/join", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const inviteJoinClub = async (data: any) => {
  try {
    const result = await axiosPublicInstance
      .post("/club/invite-join", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const updateClub = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/club/update", data, {
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

const updateGeneral = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/club/updateGeneral", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const updateColor = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/club/color", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const updateCard = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/club/updateCard", data, {
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

const uploadDoc = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/club/uploadDoc", data, {
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

const removeDoc = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/club/removeDoc", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export {
  getAllClubs,
  getClubOfLimit,
  getClub,
  createClub,
  joinClub,
  inviteJoinClub,
  updateClub,
  updateGeneral,
  updateColor,
  updateCard,
  uploadDoc,
  removeDoc,
};
