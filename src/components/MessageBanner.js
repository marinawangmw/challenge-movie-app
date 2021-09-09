import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { en } from '@/localization/en';

export const MessageBanner = ({ message = en.movieLists.noObjectOnMyList, customStyles }) => {
  const { colors } = useTheme();

  return (
    <View style={customStyles.messageContainer}>
      <Text style={{ color: colors.text }}>{message}</Text>
    </View>
  );
};
