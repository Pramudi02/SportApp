# CourtFinder - Sports Location Finder App

CourtFinder is a modern React Native mobile application built with Expo that helps users discover and manage their favorite sports venues and facilities.

## Features

- 🏀 **Sports Location Discovery**: Browse a curated list of sports facilities including basketball courts, tennis courts, gyms, swimming pools, and more
- ⭐ **Favorites Management**: Save your favorite locations with persistent storage using AsyncStorage
- 📍 **Location Details**: View detailed information about each venue including ratings, address, distance, and operating hours
- 🔐 **User Authentication**: Login and register functionality with user profile management
- 🌓 **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- 🗺️ **Navigation**: Get directions to any location using Google Maps integration
- 📱 **Responsive Design**: Clean, modern UI optimized for mobile devices

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **State Management**: Redux Toolkit
- **Data Persistence**: AsyncStorage
- **Icons**: Feather Icons via @expo/vector-icons
- **API**: Google Places API support with dummy JSON fallback
- **Language**: TypeScript

## Project Structure

```
src/
├── components/       # Reusable UI components
├── data/            # Dummy data for locations
├── navigation/      # Navigation setup (Auth, Main, Home stacks)
├── screens/         # Screen components
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   ├── LocationListScreen.tsx
│   ├── LocationDetailScreen.tsx
│   ├── FavoritesScreen.tsx
│   └── ProfileScreen.tsx
├── services/        # API and storage services
├── store/           # Redux store and slices
├── types/           # TypeScript type definitions
└── utils/           # Utility functions and theme
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (install globally with `npm install -g expo-cli`)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Pramudi02/SportApp.git
cd SportApp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your device:
   - Scan the QR code with Expo Go app (Android/iOS)
   - Press `a` for Android emulator
   - Press `i` for iOS simulator (macOS only)
   - Press `w` for web browser

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator (macOS only)
- `npm run web` - Run in web browser

## Configuration

### Google Places API (Optional)

To use real location data from Google Places API:

1. Get an API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Places API
3. Set the `GOOGLE_PLACES_API_KEY` environment variable

If no API key is provided, the app will use dummy data by default.

## Features in Detail

### Authentication
- Simple email/password authentication
- User registration with validation
- Profile management
- Logout functionality

### Location Discovery
- Browse sports facilities by type
- View ratings, distance, and operating status
- Pull to refresh location data
- Detailed view with all venue information

### Favorites
- Add/remove locations from favorites with a tap
- Persistent storage across app sessions
- Dedicated favorites screen
- Quick access to favorite venues

### Dark Mode
- System-wide dark mode toggle
- Consistent theming across all screens
- Easy on the eyes for low-light usage

## License

MIT License - feel free to use this project for learning or as a starting point for your own app.

## Author

Pramudi02