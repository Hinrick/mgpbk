import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api";

interface GameEvent {
  gameId: string;
  playerId: string;
  eventType:
    | "TWO_POINTS_ATTEMPT"
    | "THREE_POINTS_ATTEMPT"
    | "DEFENSIVE_REBOUND"
    | "OFFENSIVE_REBOUND"
    | "STEAL"
    | "BLOCK"
    | "TURNOVER"
    | "ASSISTS"
    | "FOUL"
    | "PENALTY"
    | string;
  // "details": },
  details: null | {
    success: boolean;
  };
  location: {
    x: number;
    y: number;
  };
  updateBy: string;
  createdBy: string;
}

const initialState = {
  events: [],
  status: "idle",
  error: null,
};

export const createGameEvent = createAsyncThunk(
  "event/createGameEvent",
  async (game: GameEvent, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/record", game);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    // ...reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGameEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createGameEvent.fulfilled,
        (state, _: PayloadAction<GameEvent>) => {
          state.status = "succeeded";
          //   state.events.push(action.payload);
        }
      )
      .addCase(createGameEvent.rejected, (state, action) => {
        state.status = "failed";
        // state.error = action.error.message ?? null;
      });
  },
});

export default eventSlice.reducer;
