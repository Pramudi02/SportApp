import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoritesState } from '../types';

const initialState: FavoritesState = {
  favoriteIds: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.favoriteIds.indexOf(id);
      if (index > -1) {
        state.favoriteIds.splice(index, 1);
      } else {
        state.favoriteIds.push(id);
      }
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favoriteIds = action.payload;
    },
    clearFavorites: (state) => {
      state.favoriteIds = [];
    },
  },
});

export const { toggleFavorite, setFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
