# CourtFinder App - Technical Documentation

## Overview
CourtFinder is a complete React Native + Expo mobile application for discovering and managing sports venues.

## Architecture

### State Management (Redux Toolkit)
The app uses Redux Toolkit with 4 main slices:

1. **authSlice**: Manages user authentication state
   - User login/logout
   - Registration
   - User profile data

2. **locationsSlice**: Manages sports location data
   - Fetch locations from API or dummy data
   - Loading states
   - Error handling

3. **favoritesSlice**: Manages user's favorite locations
   - Add/remove favorites
   - Persist to AsyncStorage
   - Load favorites on app start

4. **themeSlice**: Manages dark/light theme
   - Toggle between themes
   - Persist preference

### Navigation Structure
```
RootNavigator
├── Auth (Not Authenticated)
│   ├── LoginScreen
│   └── RegisterScreen
└── Main (Authenticated)
    ├── Home Tab (Stack)
    │   ├── LocationListScreen
    │   └── LocationDetailScreen
    ├── Favorites Tab
    │   └── FavoritesScreen
    └── Profile Tab
        └── ProfileScreen
```

### Data Flow
1. User authenticates → Auth state updated → Navigation switches to Main
2. App loads → Favorites loaded from AsyncStorage → Redux state updated
3. User browses locations → API/dummy data fetched → Redux locations state updated
4. User toggles favorite → Redux state updated → AsyncStorage persisted
5. User navigates → React Navigation handles transitions

### Services

#### Storage Service (`src/services/storage.ts`)
- Manages AsyncStorage operations
- Persists favorite location IDs
- Loads favorites on app initialization

#### Locations Service (`src/services/locations.ts`)
- Attempts to fetch from Google Places API if API key is configured
- Falls back to dummy data if API unavailable
- Transforms API responses to app's Location type

### Theme System
- Light and dark color schemes defined in `src/utils/theme.ts`
- Theme colors applied throughout all screens
- Consistent UI across the app

### Data Model

#### Location Type
```typescript
{
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
```

## Features Implementation

### Authentication
- Simple form validation
- Mock authentication (no backend required)
- User profile stored in Redux
- Password visibility toggle
- Navigation between Login/Register

### Location Discovery
- Grid/list of sports venues
- Pull-to-refresh functionality
- Tap to view details
- Heart icon to favorite
- Status badges (Open/Closed)
- Rating display with star icon
- Distance from user

### Location Details
- Full-screen image
- Comprehensive venue information
- Get directions button (opens Google Maps)
- Add/remove from favorites
- Navigation back to list

### Favorites Management
- Persistent storage using AsyncStorage
- Separate favorites screen
- Empty state with call-to-action
- Quick unfavorite from list
- Tap to view details

### Dark Mode
- System-wide theme toggle
- Smooth color transitions
- All screens support both themes
- Theme preference persisted

### Profile Screen
- User information display
- Stats (number of favorites)
- Settings section
- Dark mode toggle
- Clear favorites option
- App version info
- Logout functionality

## Dependencies

### Core
- `expo` - Development platform
- `react-native` - Mobile framework
- `typescript` - Type safety

### Navigation
- `@react-navigation/native` - Navigation core
- `@react-navigation/stack` - Stack navigation
- `@react-navigation/bottom-tabs` - Tab navigation
- `react-native-screens` - Native screens
- `react-native-safe-area-context` - Safe area handling

### State Management
- `@reduxjs/toolkit` - State management
- `react-redux` - React bindings for Redux

### Storage
- `@react-native-async-storage/async-storage` - Persistent storage

### UI
- `@expo/vector-icons` - Icon library (Feather icons)

### API
- `axios` - HTTP client for Google Places API

## Environment Variables

### Optional Configuration
- `GOOGLE_PLACES_API_KEY` - For real location data from Google Places API

## Running the App

### Development
```bash
npm start              # Start Expo dev server
npm run android        # Run on Android
npm run ios           # Run on iOS simulator
```

### Testing on Device
1. Install Expo Go app on your device
2. Scan QR code from terminal
3. App will load on your device

## Code Organization

### Screens
All screens follow consistent patterns:
- Use React hooks
- Connect to Redux with useSelector/useDispatch
- Apply theme colors
- Responsive styling
- Proper TypeScript typing

### Components
- Feather icons for consistent UI
- TouchableOpacity for interactive elements
- Proper accessibility considerations
- Loading states with ActivityIndicator

### Styling
- StyleSheet.create for performance
- Inline styles for dynamic theming
- Consistent spacing and sizing
- Mobile-first responsive design

## Future Enhancements

Potential features to add:
- Real backend integration
- Social features (reviews, ratings)
- Booking functionality
- Map view of all locations
- Filter and search
- Push notifications
- User reviews and photos
- Offline mode improvements
- Analytics integration

## Testing

The app includes:
- TypeScript type checking
- Redux state management testing
- Component rendering validation

## Performance Considerations

- Images loaded with placeholder fallback
- Lazy loading of location data
- Efficient Redux updates
- AsyncStorage for fast local reads
- Optimized FlatList rendering

## Security

- No sensitive data stored in plain text
- API keys should be environment variables
- User passwords validated (6+ characters)
- Secure navigation flow (auth gates)

## Accessibility

- Semantic component usage
- Icon + text labels
- Proper contrast ratios
- Touch targets sized appropriately
- Screen reader compatible

## Browser/Platform Support

- iOS devices and simulators
- Android devices and emulators
- Expo Go app support
- Web support (with additional dependencies)
