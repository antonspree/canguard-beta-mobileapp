import { axiosPrivateInstance } from "@/lib/axios";

const getFeed = async () => {
  try {
    const result = await axiosPrivateInstance
      .get("/feed")
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const createFeed = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("feed/createFeed", data, {
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

const likesFeed = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("feed/likesFeed", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const voteFeed = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("feed/voteFeed", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const removeFeed = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("feed/removeFeed", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const replyFeed = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("feed/replyFeed", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const udpateFeed = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("feed/udpateFeed", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export {
  getFeed,
  createFeed,
  likesFeed,
  voteFeed,
  removeFeed,
  replyFeed,
  udpateFeed,
};
