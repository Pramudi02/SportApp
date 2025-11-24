import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = '@theme_mode';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDarkMode: true, // Default to dark mode
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      // Save to AsyncStorage
      AsyncStorage.setItem(
        THEME_STORAGE_KEY,
        JSON.stringify(state.isDarkMode)
      ).catch((error) => {
        console.error('Failed to save theme:', error);
      });
    },
    setTheme: (state, action) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

// Async action to load theme from storage
export const loadThemeFromStorage = () => async (dispatch) => {
  try {
    const themeJson = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    if (themeJson !== null) {
      const isDarkMode = JSON.parse(themeJson);
      dispatch(setTheme(isDarkMode));
    }
  } catch (error) {
    console.error('Failed to load theme:', error);
  }
};

export default themeSlice.reducer;
