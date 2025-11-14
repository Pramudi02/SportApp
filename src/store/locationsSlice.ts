import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocationsState, Location } from '../types';

const initialState: LocationsState = {
  locations: [],
  loading: false,
  error: null,
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    fetchLocationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchLocationsSuccess: (state, action: PayloadAction<Location[]>) => {
      state.locations = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchLocationsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchLocationsStart, fetchLocationsSuccess, fetchLocationsFailure } = locationsSlice.actions;
export default locationsSlice.reducer;
