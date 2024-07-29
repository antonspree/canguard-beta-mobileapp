import { axiosPrivateInstance } from "@/lib/axios";

const getMembership = async () => {
  try {
    const result = await axiosPrivateInstance
      .get("/membership")
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const createMembership = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/membership/create", { ...data })
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export { getMembership, createMembership };
