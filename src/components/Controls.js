import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { spacing, typography } from '@/theme';
import { strings } from '@/localization';

export const Controls = ({ controlDatas, controlStyles }) => {
  const { colors } = useTheme();
  const styles = { ...defaultStyles, ...controlStyles };

  const renderControls = (control, idx) => (
    <View style={styles.controlWrapper} key={idx}>
      <TouchableOpacity onPress={control.handleControlPress}>
        <Image
          source={control.icon}
          style={[styles.icon, control.label === strings.controls.play && styles.playIcon]}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
      </TouchableOpacity>
      <Text style={[{ color: colors.text }, typography.label]}>{control.label}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { color: colors.text }]}>
      {controlDatas.map((control, idx) => renderControls(control, idx))}
    </View>
  );
};

export const defaultStyles = StyleSheet.create({
  icon: {
    width: 28,
    height: 28,
    margin: spacing.xs,
  },
  playIcon: {
    height: 34,
    marginTop: spacing.xs,
    marginBottom: 2,
  },
});
