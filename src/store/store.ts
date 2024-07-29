import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer as user } from "./reducers/userReducer";
import { clubReducer as club } from "./reducers/clubReducer";
import { membershipReducer as membership } from "./reducers/membershipReducer";
import { membersReducer as members } from "./reducers/membersReducer";
import { channelReducer as channel } from "./reducers/channelReducer";
import { chatReducer as chat } from "./reducers/chatReducer";
import { feedReducer as feed } from "./reducers/feedReducer";

export const store = configureStore({
  reducer: combineReducers({
    user,
    club,
    membership,
    members,
    channel,
    chat,
    feed,
  }),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
