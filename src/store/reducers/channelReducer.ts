import { createSlice } from "@reduxjs/toolkit";

export interface IChannel {
  channelID?: string;
  channelname?: string;
  channeldesc?: string;
  club?: string;
  owner?: string;
}

interface InitialStateType {
  channel: IChannel[];
}

const initialState: InitialStateType = {
  channel: [],
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setChannel: (state, action) => {
      state.channel = action.payload.channel;
    },
    removeChannel: (state, action) => {
      const { channelID } = action.payload;
      state.channel = state.channel.filter(
        (item) => item.channelID !== channelID
      );
    },
  },
});

export const channelReducer = channelSlice.reducer;
export const channelActions = channelSlice.actions;
