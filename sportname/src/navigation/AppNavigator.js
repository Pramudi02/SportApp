import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { checkAuthStatus } from '../redux/slices/authSlice';
import { loadFavoritesFromStorage } from '../redux/slices/favoriteSlice';
import { loadThemeFromStorage } from '../redux/slices/themeSlice';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import LeagueDetails from '../screens/LeagueDetails';
import TeamDetails from '../screens/TeamDetails';
import PlayerDetails from '../screens/PlayerDetails';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import MatchesScreen from '../screens/MatchesScreen';
import MatchDetailsScreen from '../screens/MatchDetailsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// Home Stack
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0f2744',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LeagueDetails"
        component={LeagueDetails}
        options={{ title: 'Teams' }}
      />
      <Stack.Screen
        name="TeamDetails"
        component={TeamDetails}
        options={{ title: 'Team Details' }}
      />
      <Stack.Screen
        name="PlayerDetails"
        component={PlayerDetails}
        options={{ title: 'Player Details' }}
      />
      <Stack.Screen
        name="MatchDetails"
        component={MatchDetailsScreen}
        options={{ title: 'Match Details' }}
      />
    </Stack.Navigator>
  );
}

// Matches Stack
function MatchesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0f2744',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Matches"
        component={MatchesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MatchDetails"
        component={MatchDetailsScreen}
        options={{ title: 'Match Details' }}
      />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#0f2744',
          borderTopColor: '#334155',
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: '#2196f3',
        tabBarInactiveTintColor: '#94a3b8',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MatchesTab"
        component={MatchesStack}
        options={{
          tabBarLabel: 'Matches',
          tabBarIcon: ({ color, size }) => (
            <Feather name="activity" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={size} color={color} />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: '#0f2744',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: 'Search Players',
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Feather name="star" size={size} color={color} />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: '#0f2744',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: 'Favorites',
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: '#0f2744',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

// Main App Navigator
export default function AppNavigator() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is already logged in
    dispatch(checkAuthStatus());
    // Load favorites from storage
    dispatch(loadFavoritesFromStorage());
    // Load theme preference from storage
    dispatch(loadThemeFromStorage());
  }, [dispatch]);

  return isAuthenticated ? <MainTabs /> : <AuthStack />;
}
