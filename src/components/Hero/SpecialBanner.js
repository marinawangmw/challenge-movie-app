import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { spacing, typography } from '@/theme';

const SpecialBanner = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: `${colors.secondary}4A` }]}>
      <Text style={[styles.text, typography.label, { color: colors.secondary }]}>
        Movy Original
      </Text>
    </View>
  );
};

export default SpecialBanner;

export const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.s,
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 60,
  },
  text: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
