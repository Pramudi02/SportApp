import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import AppNavigator from '../src/navigation/AppNavigator';
import { StatusBar } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#0a1929" />
      <AppNavigator />
    </Provider>
  );
}
