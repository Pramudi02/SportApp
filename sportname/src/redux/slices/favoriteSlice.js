import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_STORAGE_KEY = '@favorites';

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    loading: false,
  },
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    toggleFavorite: (state, action) => {
      const player = action.payload;
      const existingIndex = state.favorites.findIndex(
        (fav) => fav.idPlayer === player.idPlayer
      );

      if (existingIndex >= 0) {
        // Remove from favorites
        state.favorites.splice(existingIndex, 1);
      } else {
        // Add to favorites
        state.favorites.push(player);
      }

      // Save to AsyncStorage
      AsyncStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(state.favorites)
      ).catch((error) => {
        console.error('Failed to save favorites:', error);
      });
    },
    loadFavorites: (state, action) => {
      state.favorites = action.payload || [];
    },
  },
});

export const { setFavorites, toggleFavorite, loadFavorites } =
  favoriteSlice.actions;

// Async action to load favorites from storage
export const loadFavoritesFromStorage = () => async (dispatch) => {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
    if (favoritesJson) {
      const favorites = JSON.parse(favoritesJson);
      dispatch(loadFavorites(favorites));
    }
  } catch (error) {
    console.error('Failed to load favorites:', error);
  }
};

export default favoriteSlice.reducer;
