import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { defaultStyles } from './Loading.styles';

export const Loading = ({ customStyles }) => {
  const { colors } = useTheme();
  const styles = customStyles || defaultStyles;

  return (
    <View style={[styles.container, { backgroundColor: `${colors.background}CC` }]}>
      <ActivityIndicator size="large" color={colors.secondary} />
    </View>
  );
};
