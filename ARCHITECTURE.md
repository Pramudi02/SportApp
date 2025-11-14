# CourtFinder App - Quick Start & Architecture

## 🚀 Quick Start

### Prerequisites
```bash
# Install Node.js (v14+) and npm
node --version
npm --version

# Install Expo CLI globally (optional)
npm install -g expo-cli
```

### Installation & Running
```bash
# 1. Clone the repository
git clone https://github.com/Pramudi02/SportApp.git
cd SportApp

# 2. Install dependencies
npm install

# 3. Start the development server
npm start

# 4. Run on device/simulator
# - Scan QR code with Expo Go app (iOS/Android)
# - Press 'a' for Android emulator
# - Press 'i' for iOS simulator (macOS only)
```

## 📱 App Architecture Overview

### Navigation Flow
```
App.tsx (Redux Provider)
    ↓
RootNavigator (Auth Check)
    ↓
    ├─→ [NOT AUTHENTICATED]
    │   AuthNavigator (Stack)
    │       ├─→ LoginScreen
    │       └─→ RegisterScreen
    │
    └─→ [AUTHENTICATED]
        MainNavigator (Bottom Tabs)
            ├─→ Home Tab
            │   HomeNavigator (Stack)
            │       ├─→ LocationListScreen
            │       └─→ LocationDetailScreen
            │
            ├─→ Favorites Tab
            │   FavoritesScreen
            │
            └─→ Profile Tab
                ProfileScreen
```

### State Management (Redux Toolkit)
```
store/
  ├─ authSlice.ts       → User authentication state
  ├─ locationsSlice.ts  → Sports locations data
  ├─ favoritesSlice.ts  → User's favorite locations
  └─ themeSlice.ts      → Dark/Light mode preference
```

### Data Flow
```
1. User Action → Dispatch Redux Action
2. Redux Reducer → Update State
3. useSelector Hook → Component Re-renders
4. Side Effects → Services (AsyncStorage/API)
```

## 🏗️ Project Structure

```
SportApp/
├── 📱 src/
│   ├── 🧩 components/
│   │   └── Loading.tsx           # Reusable loading indicator
│   │
│   ├── 📊 data/
│   │   └── dummyData.ts          # 8 sports locations
│   │
│   ├── 🧭 navigation/
│   │   ├── AuthNavigator.tsx     # Login/Register navigation
│   │   ├── HomeNavigator.tsx     # Location list/detail navigation
│   │   ├── MainNavigator.tsx     # Bottom tab navigation
│   │   └── RootNavigator.tsx     # Root auth check navigation
│   │
│   ├── 📺 screens/
│   │   ├── LoginScreen.tsx       # User login
│   │   ├── RegisterScreen.tsx    # User registration
│   │   ├── LocationListScreen.tsx    # Browse locations
│   │   ├── LocationDetailScreen.tsx  # Location details
│   │   ├── FavoritesScreen.tsx   # User's favorites
│   │   └── ProfileScreen.tsx     # User profile & settings
│   │
│   ├── 🔌 services/
│   │   ├── locations.ts          # Google Places API / Dummy data
│   │   └── storage.ts            # AsyncStorage operations
│   │
│   ├── 🗄️ store/
│   │   ├── authSlice.ts          # Authentication state
│   │   ├── favoritesSlice.ts     # Favorites state
│   │   ├── locationsSlice.ts     # Locations state
│   │   ├── themeSlice.ts         # Theme state
│   │   └── index.ts              # Store configuration
│   │
│   ├── 📝 types/
│   │   └── index.ts              # TypeScript definitions
│   │
│   └── 🎨 utils/
│       └── theme.ts              # Light/Dark theme colors
│
├── 🖼️ assets/                    # App icons and images
├── 📄 App.tsx                    # Root component
├── ⚙️ app.json                   # Expo configuration
├── 📦 package.json               # Dependencies
├── 🔧 tsconfig.json              # TypeScript config
├── 📖 README.md                  # Main documentation
├── 📚 TECHNICAL_DOCS.md          # Technical details
├── 👤 USER_GUIDE.md              # User instructions
└── 🏛️ ARCHITECTURE.md            # This file
```

## 🎯 Feature Matrix

| Feature | Screen | Redux Slice | Service |
|---------|--------|-------------|---------|
| Login | LoginScreen | authSlice | - |
| Register | RegisterScreen | authSlice | - |
| Browse Locations | LocationListScreen | locationsSlice | locations.ts |
| View Details | LocationDetailScreen | locationsSlice | - |
| Add/Remove Favorites | All Screens | favoritesSlice | storage.ts |
| View Favorites | FavoritesScreen | favoritesSlice | - |
| Dark Mode | All Screens | themeSlice | - |
| Profile & Logout | ProfileScreen | authSlice | storage.ts |

## 🔑 Key Components

### Redux Slices

#### authSlice
```typescript
State: { user, isAuthenticated, loading }
Actions: loginSuccess, logout, register
```

#### locationsSlice
```typescript
State: { locations, loading, error }
Actions: fetchLocationsStart, fetchLocationsSuccess, fetchLocationsFailure
```

#### favoritesSlice
```typescript
State: { favoriteIds }
Actions: toggleFavorite, setFavorites, clearFavorites
```

#### themeSlice
```typescript
State: { isDarkMode }
Actions: toggleTheme, setTheme
```

### Services

#### storage.ts
```typescript
- saveFavorites(ids: string[]): Promise<void>
- loadFavorites(): Promise<string[]>
- clearFavorites(): Promise<void>
```

#### locations.ts
```typescript
- fetchLocations(): Promise<Location[]>
  // Tries Google Places API, falls back to dummy data
```

## 🎨 Theme System

### Color Schemes
```typescript
Light Mode:
  - Background: #ffffff
  - Primary: #007bff
  - Text: #212529
  - Card: #f8f9fa

Dark Mode:
  - Background: #121212
  - Primary: #4d9fff
  - Text: #ffffff
  - Card: #1e1e1e
```

### Usage
```typescript
const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
const colors = getThemeColors(isDarkMode);
// Use colors.background, colors.primary, etc.
```

## 📱 Screen Layouts

### LocationListScreen
```
┌──────────────────────────┐
│ Find Courts      [refresh]│
├──────────────────────────┤
│ ┌──────────────────────┐ │
│ │  [Image]             │ │
│ │  City Sports Center ♥│ │
│ │  Basketball          │ │
│ │  📍 123 Main St      │ │
│ │  ⭐ 4.5  🧭 0.5 km   │ │
│ │  [Open]              │ │
│ └──────────────────────┘ │
│ ┌──────────────────────┐ │
│ │  [Next Location...]  │ │
└──────────────────────────┘
```

### LocationDetailScreen
```
┌──────────────────────────┐
│ ← Details           ♥    │
├──────────────────────────┤
│                          │
│      [Large Image]       │
│                          │
├──────────────────────────┤
│ City Sports Center       │
│ Basketball      [Open]   │
│                          │
│ ⭐ Rating: 4.5 / 5.0     │
│ 📍 Address: 123 Main St  │
│ 🧭 Distance: 0.5 km      │
│ 💲 Price: $$             │
│                          │
│ ┌──────────────────────┐ │
│ │ 🧭 Get Directions    │ │
│ └──────────────────────┘ │
└──────────────────────────┘
```

## 🔄 Data Persistence

### AsyncStorage Keys
- `@courtfinder_favorites`: Array of favorite location IDs

### Storage Flow
```
App Launch
    ↓
Load favorites from AsyncStorage
    ↓
Update Redux state (setFavorites)
    ↓
User toggles favorite
    ↓
Update Redux state (toggleFavorite)
    ↓
Auto-save to AsyncStorage
```

## 🌐 API Integration

### Google Places API (Optional)
```typescript
// If GOOGLE_PLACES_API_KEY is set
GET https://maps.googleapis.com/maps/api/place/nearbysearch/json
Params:
  - location: "40.7128,-74.0060" (NYC)
  - radius: 5000
  - type: "gym|stadium"
  - key: GOOGLE_PLACES_API_KEY

// Response transformed to Location type
```

### Dummy Data Fallback
```typescript
// If no API key or API fails
Returns 8 pre-defined sports locations:
  - Basketball courts
  - Tennis courts
  - Soccer fields
  - Gyms
  - Swimming pools
  - Bike trails
  - Yoga studios
```

## 🧪 Testing the App

### Manual Testing Checklist
- [ ] Login with email/password
- [ ] Register new account
- [ ] Browse location list
- [ ] Pull to refresh locations
- [ ] Tap location to view details
- [ ] Add location to favorites (heart icon)
- [ ] Remove from favorites
- [ ] View Favorites tab
- [ ] Navigate to detail from favorites
- [ ] Toggle dark mode
- [ ] Clear all favorites
- [ ] Get directions (opens Maps)
- [ ] Logout

### TypeScript Validation
```bash
npx tsc --noEmit
# Should show no errors
```

### Security Scan
```bash
# CodeQL scan passed with 0 vulnerabilities
```

## 📦 Dependencies

### Core
- `expo` (SDK 54): Development platform
- `react-native` (0.76.5): Mobile framework
- `typescript` (5.3.3): Type safety

### Navigation
- `@react-navigation/native` (7.1.20)
- `@react-navigation/stack` (7.8.5)
- `@react-navigation/bottom-tabs` (7.8.5)

### State Management
- `@reduxjs/toolkit` (2.5.3)
- `react-redux` (9.2.1)

### Storage & API
- `@react-native-async-storage/async-storage` (2.2.0)
- `axios` (1.7.9)

### UI
- `@expo/vector-icons` (15.0.3) - Feather icons

## 🚢 Deployment

### Build for Production
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

### Expo Go Testing
```bash
# Start dev server
npm start

# Scan QR code with Expo Go app
# Available on iOS App Store and Google Play
```

## 📞 Support

- **Documentation**: README.md, TECHNICAL_DOCS.md, USER_GUIDE.md
- **GitHub**: https://github.com/Pramudi02/SportApp
- **Issues**: Submit via GitHub Issues

---

**Version**: 1.0.0  
**Last Updated**: 2025-11-14  
**License**: MIT
