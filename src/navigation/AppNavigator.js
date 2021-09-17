import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TabBarIcon } from '@/components';
import { NAVIGATION } from '@/constants';
import { HomeNavigator } from '@/navigation/HomeNavigator';
import { ProfileNavigator } from '@/navigation/ProfileNavigator';
import { MovieCollectionNavigator } from '@/navigation/MovieCollectionNavigator';
import { SearchNavigator } from '@/navigation/SearchNavigator';

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => <TabBarIcon color={color} routeName={route.name} />,
      })}
      tabBarOptions={{
        activeTintColor: colors.activeTab,
        inactiveTintColor: colors.inactiveTab,
        showLabel: false,
      }}
    >
      <Tab.Screen name={NAVIGATION.home} component={HomeNavigator} />
      <Tab.Screen name={NAVIGATION.search} component={SearchNavigator} />
      <Tab.Screen name={NAVIGATION.myList} component={MovieCollectionNavigator} />
      <Tab.Screen name={NAVIGATION.profile} component={ProfileNavigator} />
    </Tab.Navigator>
  );
}
