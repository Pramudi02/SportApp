import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import footballReducer from './slices/footballSlice';
import favoriteReducer from './slices/favoriteSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    football: footballReducer,
    favorites: favoriteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['favorites/toggleFavorite'],
      },
    }),
});

export default store;
