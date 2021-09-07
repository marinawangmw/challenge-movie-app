import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { homeIcon, searchIcon, myListIcon, profileIcon } from '@/assets';
import { NAVIGATION } from '@/constants';

const tabIcon = {
  [NAVIGATION.home]: homeIcon,
  [NAVIGATION.search]: searchIcon,
  [NAVIGATION.myList]: myListIcon,
  [NAVIGATION.profile]: profileIcon,
};

export function TabBarIcon({ color, routeName }) {
  return (
    <Image
      accessibilityIgnoresInvertColors
      source={tabIcon[routeName]}
      style={[{ tintColor: color }, styles.icon]}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 22.67,
    width: 26.67,
    resizeMode: 'contain',
  },
});

TabBarIcon.propTypes = {
  color: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
};
