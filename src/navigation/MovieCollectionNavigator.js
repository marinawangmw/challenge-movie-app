import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { useSelector } from 'react-redux';
import { NAVIGATION } from '@/constants';
import { MovieCollection } from '@/screens';
import { getMyList } from '@/selectors/MovieListSelectors';

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
          noObjectMessage: "There's no movie added to My List yet",
        }}
      />
    </Stack.Navigator>
  );
}
