import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api";

const initialState: {
  players: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
} = {
  players: [],
  status: "idle",
  error: null,
};

export const fetchPlayers = createAsyncThunk(
  "season/fetchPlayers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/players");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createPlayer = createAsyncThunk(
  "season/createPlayer",
  async (player: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/players", player);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlayers.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.players = action.payload;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPlayer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPlayer.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.players.push(action.payload);
      })
      .addCase(createPlayer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default playerSlice.reducer;
