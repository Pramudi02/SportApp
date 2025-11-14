import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { getThemeColors } from '../utils/theme';
import LocationListScreen from '../screens/LocationListScreen';
import LocationDetailScreen from '../screens/LocationDetailScreen';
import { HomeStackParamList } from '../types';

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeNavigator() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const colors = getThemeColors(isDarkMode);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="LocationList"
        component={LocationListScreen}
        options={{ title: 'Find Courts' }}
      />
      <Stack.Screen
        name="LocationDetail"
        component={LocationDetailScreen}
        options={{ title: 'Location Details' }}
      />
    </Stack.Navigator>
  );
}
