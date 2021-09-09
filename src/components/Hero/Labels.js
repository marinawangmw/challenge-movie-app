import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { typography, spacing } from '@/theme';

const Labels = ({ labels }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {labels &&
        labels.slice(0, 3).map((label, idx) => (
          <View style={styles.row} key={idx}>
            {idx > 0 && <Text style={[styles.divider, { color: colors.text }]}>{'\u2B24'}</Text>}
            <Text style={[{ color: colors.text }, typography.text]}>{label.name}</Text>
          </View>
        ))}
    </View>
  );
};

export default Labels;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.m,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  divider: {
    fontSize: 7,
    paddingVertical: spacing.xs,
  },
});
