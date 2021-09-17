import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { styles } from './Loading.styles';

export const Loading = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: `${colors.background}CC` }]}>
      <ActivityIndicator size="large" color={colors.secondary} />
    </View>
  );
};
