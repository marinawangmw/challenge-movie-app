import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { useTheme } from '@react-navigation/native';
import { screenOptions } from './helper';
import { NAVIGATION } from '@/constants';
import { Home, MovieCollection, MovieDetail } from '@/screens';

const Stack = createNativeStackNavigator();

export function HomeNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator screenOptions={screenOptions(colors.text)}>
      <Stack.Screen name={NAVIGATION.home} component={Home} options={{ headerShown: false }} />
      <Stack.Screen name={NAVIGATION.movieCollection} component={MovieCollection} />
      <Stack.Screen name={NAVIGATION.movieDetail} component={MovieDetail} />
    </Stack.Navigator>
  );
}
