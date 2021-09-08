import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NAVIGATION } from '@/constants';
import { MovieCollection } from '@/screens';

const Stack = createNativeStackNavigator();

export function MovieCollectionNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NAVIGATION.myList}
        component={MovieCollection}
        options={{ headerShow: true }}
      />
    </Stack.Navigator>
  );
}
