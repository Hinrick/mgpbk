import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import gameSlice from "./slices/gameSlice";
import seasonSlice from "./slices/seasonSlice";
import playerSlice from "./slices/playerSlice";
import teamSlice from "./slices/teamSlice";
import eventSlice from "./slices/gameEventSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameSlice,
    season: seasonSlice,
    player: playerSlice,
    team: teamSlice,
    event: eventSlice,
  },
  // If you have middleware to add, you can do so here
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // If you want to add Redux DevTools Extension options, you can do so here
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
