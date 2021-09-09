import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { useSelector } from 'react-redux';
import { NAVIGATION } from '@/constants';
import { MovieCollection } from '@/screens';
import { getMyList } from '@/selectors/MovieListSelectors';
import { en } from '@/localization/en';

const Stack = createNativeStackNavigator();

export function MovieCollectionNavigator() {
  const myList = useSelector(getMyList);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NAVIGATION.myList}
        component={MovieCollection}
        options={{ headerShow: true }}
        initialParams={{
          collection: myList,
          noObjectMessage: en.movieLists.noObjectOnMyList,
        }}
      />
    </Stack.Navigator>
  );
}
