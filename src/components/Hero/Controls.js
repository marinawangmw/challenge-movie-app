import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { spacing, typography } from '@/theme';
import { addIcon, playIcon, infoIcon } from '@/assets';
import { strings } from '@/localization';

const Controls = () => {
  const { colors } = useTheme();
  const controlDatas = [
    { icon: addIcon, label: strings.controls.myList },
    { icon: playIcon, label: strings.controls.play },
    { icon: infoIcon, label: strings.controls.info },
  ];

  const renderControls = (control, idx) => (
    <View style={styles.controlWrapper} key={idx}>
      <TouchableOpacity>
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

export default Controls;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.xl,
    marginVertical: spacing.xs,
  },
  controlWrapper: {
    padding: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
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
