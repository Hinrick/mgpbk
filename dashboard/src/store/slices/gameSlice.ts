import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api";

interface Game {
  id: string;
  title: string;
  seasonId: string;
  startedDateTime: Date;
  endedDateTime: Date;
}

interface GameState {
  games: Game[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
  game: Game | {};
}

interface GameRequestData {
  teamAId: string;
  teamBId: string;
  seasonId: string;
  startedDateTime: Date | null;
  endedDateTime: Date | null;
  updateBy: string;
  createdBy: string;
}

const initialState: GameState = {
  games: [],
  game: {},
  status: "idle",
  error: null,
};

export const updateGamePlayerData = createAsyncThunk(
  "game/updateGamePlayerData",
  async (
    data: {
      gameId: string;
      teamId: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.put(
        `/games/${data.gameId}/${data.teamId}`,
        data.data
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunks
export const fetchGamesBySeason = createAsyncThunk(
  "game/fetchGamesBySeason",
  async (seasonId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/games/season/${seasonId}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createGame = createAsyncThunk(
  "game/createGame",
  async (game: GameRequestData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/games", game);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGameDetail = createAsyncThunk(
  "game/fetchGameDetail",
  async (gameId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/games/${gameId}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateGame = createAsyncThunk(
  "game/updateGame",
  async (game: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/games/${game.id}`, game);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // ...reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGamesBySeason.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchGamesBySeason.fulfilled,
        (state, action: PayloadAction<Game[]>) => {
          state.status = "succeeded";
          action.payload.sort(
            (a: any, b: any) =>
              +new Date(a.startedDateTime).getTime() -
              +new Date(b.startedDateTime).getTime()
          );
          state.games = action.payload;
        }
      )
      .addCase(fetchGamesBySeason.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchGameDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchGameDetail.fulfilled,
        (state, action: PayloadAction<Game>) => {
          state.status = "succeeded";
          state.game = action.payload;
        }
      )
      .addCase(fetchGameDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as any).message;
      })
      .addCase(updateGame.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateGame.fulfilled, (state, action: PayloadAction<Game>) => {
        state.status = "succeeded";
      })
      .addCase(updateGame.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as any).message;
      });
  },
});

export default gameSlice.reducer;
