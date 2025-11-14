// Type definitions for the CourtFinder app

export interface Location {
  id: string;
  name: string;
  address: string;
  rating: number;
  distance?: string;
  sportType: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  openNow?: boolean;
  priceLevel?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface LocationsState {
  locations: Location[];
  loading: boolean;
  error: string | null;
}

export interface FavoritesState {
  favoriteIds: string[];
}

export interface RootState {
  auth: AuthState;
  locations: LocationsState;
  favorites: FavoritesState;
  theme: ThemeState;
}

export interface ThemeState {
  isDarkMode: boolean;
}

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Favorites: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  LocationList: undefined;
  LocationDetail: { locationId: string };
};
