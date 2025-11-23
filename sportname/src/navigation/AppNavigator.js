import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from 'react-native';
import { checkAuthStatus } from '../redux/slices/authSlice';
import { loadFavoritesFromStorage } from '../redux/slices/favoriteSlice';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import LeagueDetails from '../screens/LeagueDetails';
import TeamDetails from '../screens/TeamDetails';
import PlayerDetails from '../screens/PlayerDetails';
import FavoritesScreen from '../screens/FavoritesScreen';

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
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color }) => <TabIcon name="⚽" color={color} />,
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color }) => <TabIcon name="★" color={color} />,
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
    </Tab.Navigator>
  );
}

// Simple tab icon component
function TabIcon({ name, color }) {
  return (
    <Text style={{ fontSize: 24, color }}>
      {name}
    </Text>
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
  }, [dispatch]);

  return isAuthenticated ? <MainTabs /> : <AuthStack />;
}
