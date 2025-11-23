import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getLeagues,
  getTeamsByLeague,
  getTeamDetails,
  getPlayersByTeam,
  getPlayerDetails,
  searchPlayers,
} from '../../api/footballApi';

// Async thunks
export const fetchLeagues = createAsyncThunk(
  'football/fetchLeagues',
  async (_, { rejectWithValue }) => {
    try {
      const leagues = await getLeagues();
      return leagues;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTeamsByLeague = createAsyncThunk(
  'football/fetchTeamsByLeague',
  async (leagueId, { rejectWithValue }) => {
    try {
      const teams = await getTeamsByLeague(leagueId);
      return teams;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTeamDetails = createAsyncThunk(
  'football/fetchTeamDetails',
  async (teamId, { rejectWithValue }) => {
    try {
      const team = await getTeamDetails(teamId);
      return team;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPlayersByTeam = createAsyncThunk(
  'football/fetchPlayersByTeam',
  async (teamId, { rejectWithValue }) => {
    try {
      const players = await getPlayersByTeam(teamId);
      return players;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPlayerDetails = createAsyncThunk(
  'football/fetchPlayerDetails',
  async (playerId, { rejectWithValue }) => {
    try {
      const player = await getPlayerDetails(playerId);
      return player;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchPlayersAction = createAsyncThunk(
  'football/searchPlayers',
  async (searchQuery, { rejectWithValue }) => {
    try {
      const players = await searchPlayers(searchQuery);
      return players;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const footballSlice = createSlice({
  name: 'football',
  initialState: {
    leagues: [],
    teams: [],
    players: [],
    currentTeam: null,
    currentPlayer: null,
    searchResults: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch leagues
      .addCase(fetchLeagues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeagues.fulfilled, (state, action) => {
        state.loading = false;
        state.leagues = action.payload;
      })
      .addCase(fetchLeagues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch teams by league
      .addCase(fetchTeamsByLeague.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamsByLeague.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(fetchTeamsByLeague.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch team details
      .addCase(fetchTeamDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTeam = action.payload;
      })
      .addCase(fetchTeamDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch players by team
      .addCase(fetchPlayersByTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayersByTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.players = action.payload;
      })
      .addCase(fetchPlayersByTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch player details
      .addCase(fetchPlayerDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayerDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPlayer = action.payload;
      })
      .addCase(fetchPlayerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search players
      .addCase(searchPlayersAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPlayersAction.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchPlayersAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSearchResults } = footballSlice.actions;
export default footballSlice.reducer;
