import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api";

interface TeamState {
  teams: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: TeamState = {
  teams: [],
  status: "idle",
  error: null,
};

export const fetchTeamsByLeague = createAsyncThunk(
  "team/fetchTeamsByLeague",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/teams/sNJc8VNICZt5a6WxW0aj`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createTeam = createAsyncThunk(
  "team/createTeam",
  async (team: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/teams", team);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    // ...reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamsByLeague.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchTeamsByLeague.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.status = "succeeded";
          state.teams = action.payload;
        }
      )
      .addCase(fetchTeamsByLeague.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createTeam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTeam.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.teams.push(action.payload);
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default teamSlice.reducer;
