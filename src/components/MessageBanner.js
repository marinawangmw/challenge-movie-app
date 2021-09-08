import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

export const MessageBanner = ({
  message = "There's no movie added to My List yet",
  customStyles,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[customStyles.messageContainer]}>
      <Text style={{ color: colors.text }}>{message}</Text>
    </View>
  );
};
