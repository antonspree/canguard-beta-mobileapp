import { createSlice } from "@reduxjs/toolkit";
import { IClub } from "./clubReducer";

export interface IUser {
  _id?: string;
  email?: string;
  username?: string;
  birth?: string;
  avatar?: string;
  alias?: string;
  phone?: string;
  street?: string;
  address?: string;
  postcode?: string;
  city?: string;
  country?: string;
  bio?: string;
  club?: IClub;
  role?: string;
  status?: string;
  clubrole?: ("board" | "gardener" | "member" | "preventer")[];
  memberID?: string;
  memberdate?: string;
  verifycontent?: string;
}

interface InitialStateType {
  user: IUser | null;
}

const initialState: InitialStateType = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
