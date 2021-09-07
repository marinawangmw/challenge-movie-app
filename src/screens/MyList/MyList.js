import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { styles } from './MyList.styles';

export const MyList = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[{ color: colors.text }, styles.text]}>MY LIST!</Text>
    </View>
  );
};
