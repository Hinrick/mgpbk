import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api";

const initialState: {
  seasons: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
} = {
  seasons: [],
  status: "idle",
  error: null,
};

export const fetchSeasons = createAsyncThunk(
  "season/fetchSeasons",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(
        "/seasons/by-league/sNJc8VNICZt5a6WxW0aj"
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const seasonSlice = createSlice({
  name: "season",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeasons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSeasons.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.seasons = action.payload;
      })
      .addCase(fetchSeasons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default seasonSlice.reducer;
