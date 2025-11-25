# FootyScope

A comprehensive React Native mobile application for football enthusiasts to explore leagues, teams, players, matches, and latest football news.

## Features

- **Home Dashboard**: View top football news and browse leagues with beautiful UI
- **Matches**: Track upcoming and recent fixtures with live scores from major leagues
- **League Explorer**: Browse football leagues and view detailed information
- **Team Details**: Explore team information, player rosters, and statistics
- **Player Profiles**: View detailed player information including biography, stats, and career details
- **Search**: Quickly find players by name
- **Favorites**: Save and manage your favorite players
- **News**: Stay updated with latest football news from around the world
- **Dark/Light Theme**: Toggle between dark and light modes
- **User Authentication**: Secure login and registration system

## Tech Stack

- **Framework**: React Native with Expo
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation (Stack & Bottom Tabs)
- **APIs**: 
  - TheSportsDB API (leagues, teams, players, matches)
  - NewsAPI (football news)
  - DummyJSON (authentication)
- **Storage**: AsyncStorage
- **UI**: Custom themed components with LinearGradient
- **Icons**: Feather Icons

## Project Structure

```
sportname/
├── src/
│   ├── api/              # API service layer
│   ├── navigation/       # Navigation configuration
│   ├── redux/           # Redux store and slices
│   ├── screens/         # Screen components
│   └── theme/           # Theme configuration (dark/light)
├── app/                 # Expo Router configuration
└── assets/             # Images and static files
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Pramudi02/SportApp.git
cd SportApp/sportname
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
   - Scan the QR code with Expo Go app (iOS/Android)
   - Press `a` for Android emulator
   - Press `i` for iOS simulator

## Environment Setup

No additional environment variables needed. The app uses free public APIs.

## Key Features Breakdown

### Authentication
- Local user registration with persistent storage
- Login with registered credentials or demo account
- Auto-login after registration
- Secure token management

### Home Screen
- Dual tab interface (News/Leagues)
- Top 10 latest football news
- League browsing with images
- Pull-to-refresh functionality

### Matches Screen
- Toggle between upcoming and recent matches
- Shows fixtures from Premier League, La Liga, and Bundesliga
- Real-time match status and scores
- Detailed match information with venue and attendance

### Search & Discovery
- Player search functionality
- Browse teams by league
- View detailed player statistics
- Add players to favorites

### Theme Support
- System-wide dark/light theme toggle
- Persistent theme preference
- Smooth theme transitions

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web browser

## APIs Used

1. **TheSportsDB** (Free tier)
   - Endpoints: Leagues, Teams, Players, Matches
   - No API key required

2. **NewsAPI** (Free tier)
   - Provides latest football news
   - Requires API key (free plan available)

3. **DummyJSON**
   - Authentication endpoints for demo

## Contributing

This is an academic project. For suggestions or issues, please open an issue on GitHub.


## Author

Pramudi Smarawickrama 

## Acknowledgments

- TheSportsDB for comprehensive football data
- NewsAPI for football news feed
- Expo team for amazing development tools
