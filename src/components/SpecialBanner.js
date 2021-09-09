import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { en } from '@/localization/en';

export const SpecialBanner = ({
  styles = { banner: styles.container, bannerLabel: styles.text },
}) => {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerLabel}>{en.movieLists.movyOriginal}</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {},
  text: {},
});
