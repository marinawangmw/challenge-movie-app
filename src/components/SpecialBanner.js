import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SpecialBanner = ({
  styles = { banner: styles.container, bannerLabel: styles.text },
}) => {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerLabel}>Movy Original</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {},
  text: {},
});
