import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { spacing, typography } from '@/theme';
import { addIcon, playIcon, infoIcon } from '@/assets';

const MY_LIST = 'My List';
const PLAY = 'Play';
const INFO = 'Info';

const Controls = () => {
  const { colors } = useTheme();
  const controlDatas = [
    { icon: addIcon, label: MY_LIST },
    { icon: playIcon, label: PLAY },
    { icon: infoIcon, label: INFO },
  ];

  const renderControls = (control, idx) => (
    <View style={styles.controlWrapper} key={idx}>
      <TouchableOpacity>
        <Image
          source={control.icon}
          style={[styles.icon, control.label === 'Play' && styles.playIcon]}
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
