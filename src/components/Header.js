import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { spacing } from '@/theme';

export const Header = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require('@/assets/logo/logo.png')}
        style={styles.headerImg}
        resizeMode="contain"
        accessibilityIgnoresInvertColors
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImg: {
    height: 40,
    width: 76,
    marginTop: spacing.s,
  },
});
