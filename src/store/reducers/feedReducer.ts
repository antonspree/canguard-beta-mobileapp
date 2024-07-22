import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./userReducer";

export interface IFeed {
  _id?: string;
  user?: IUser;
  content?: string;
  images?: string[];
  documents?: { docname: string; source: string }[];
  votes?: {
    id: string;
    value: string;
    voters?: string[];
  }[];
  date?: string;
  detail?: {
    user?: IUser;
    content?: string;
    images?: string[];
    documents?: { docname: string; source: string }[];
    date?: string;
  }[];
  likes?: string[];
  createdAt?: Date,
  updatedAt?: Date
}

interface InitialStateType {
  feed: IFeed[];
}

const initialState: InitialStateType = {
  feed: [],
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeed: (state, action) => {
      state.feed = action.payload.feed;
    },
    updateFeed: (state, action) => {
      const { feedID, feed } = action.payload;
      const index = state.feed.findIndex((item) => item._id === feedID);

      if (index !== -1) {
        state.feed[index] = { ...state.feed[index], ...feed };
      }
    },
  },
});

export const feedReducer = feedSlice.reducer;
export const feedActions = feedSlice.actions;
