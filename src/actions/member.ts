import { axiosPrivateInstance } from "@/lib/axios";

const updateStatus = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/member/updateStatus", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const getMember = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/member", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const updateMember = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/member/updateMember", data, {
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

const updateRole = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/member/updateRole", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const inviteMember = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/member/invite", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const removeMember = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/member/remove", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export {
  updateStatus,
  getMember,
  updateMember,
  updateRole,
  inviteMember,
  removeMember,
};
