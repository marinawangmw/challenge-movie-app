import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { screenOptions } from './helper';
import { NAVIGATION } from '@/constants';
import { MovieCollection, MovieDetail } from '@/screens';
import { getMyList } from '@/selectors/MovieListSelectors';
import { en } from '@/localization/en';

const Stack = createNativeStackNavigator();

export function MovieCollectionNavigator() {
  const myList = useSelector(getMyList);
  const { colors } = useTheme();

  return (
    <Stack.Navigator screenOptions={screenOptions(colors.text)}>
      <Stack.Screen
        name={NAVIGATION.myList}
        component={MovieCollection}
        initialParams={{
          collection: myList,
          noObjectMessage: en.movieLists.noObjectOnMyList,
        }}
      />
      <Stack.Screen name={NAVIGATION.movieDetail} component={MovieDetail} />
    </Stack.Navigator>
  );
}
