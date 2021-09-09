import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { useTheme } from '@react-navigation/native';
import { NAVIGATION } from '@/constants';
import { Home, MovieCollection } from '@/screens';

const Stack = createNativeStackNavigator();

export function HomeNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen name={NAVIGATION.home} component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name={NAVIGATION.movieCollection}
        component={MovieCollection}
        options={{ headerShown: true, headerBackTitle: '', headerTintColor: colors.text }}
      />
    </Stack.Navigator>
  );
}
