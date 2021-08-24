import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, typography } from '@/theme';

const SpecialBanner = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, typography.label]}>Movy Original</Text>
    </View>
  );
};

export default SpecialBanner;

export const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.s,
    backgroundColor: 'rgba(5, 120, 255, 0.29)',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 60,
  },
  text: {
    textTransform: 'uppercase',
    color: '#0578FF',
    letterSpacing: 0.5,
  },
});
