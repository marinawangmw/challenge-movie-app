import React from 'react';
import { StyleSheet, View, Image, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { typography, spacing } from '@/theme';
import { searchIcon, audioIcon } from '@/assets';
import { en } from '@/localization/en';

export const SearchBar = ({ input, setInput }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
      <Image source={searchIcon} style={styles.icon} accessibilityIgnoresInvertColors />
      <TextInput
        autoFocus
        placeholder={en.search.inputPlaceholder}
        placeholderTextColor={colors.text}
        value={input}
        onChangeText={setInput}
        style={[styles.input, { color: colors.text }, typography.text]}
      />
      <Image source={audioIcon} style={styles.icon} accessibilityIgnoresInvertColors />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: '100%',
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
  },
  icon: {
    height: 15,
    width: 15,
    marginHorizontal: spacing.s,
    resizeMode: 'contain',
  },
  title: {
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.s,
  },
});
