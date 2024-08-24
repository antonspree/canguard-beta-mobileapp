import { createSlice } from "@reduxjs/toolkit";

export interface IApp {
  visibleDrawerMenu: boolean;
}

const initialState: IApp = {
  visibleDrawerMenu: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setVisibleDrawerMenu: (state, action) => {
      state.visibleDrawerMenu = action.payload;
    },
  },
});

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;
