import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { typography, spacing } from '@/theme';

const Labels = ({ labels }) => {
  return (
    <View style={styles.container}>
      {labels.slice(0, 3).map((label, idx) => (
        <View style={styles.row} key={idx}>
          {idx > 0 && <Text style={styles.divider}>{'\u2B24'}</Text>}
          <Text style={[styles.label, typography.text]}>{label.name}</Text>
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
  label: {
    color: 'white',
  },
  divider: {
    color: 'white',
    fontSize: 7,
    paddingVertical: spacing.xs,
  },
});
