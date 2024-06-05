import { createSlice } from "@reduxjs/toolkit";

export interface IMembership {
  membershipname?: string;
  description?: string;
  period?: string;
  price?: number;
  cannabis?: number;
  cutting?: number;
  seed?: number;
  minAge?: number;
  user?: string;
}

interface InitialStateType {
  membership: IMembership[];
}

const initialState: InitialStateType = {
  membership: [],
};

const membershipSlice = createSlice({
  name: "membership",
  initialState,
  reducers: {
    setMembership: (state, action) => {
      state.membership = action.payload.membership;
    },
  },
});

export const membershipReducer = membershipSlice.reducer;
export const membershipActions = membershipSlice.actions;
