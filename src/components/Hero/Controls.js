import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { spacing, typography } from '@/theme';

const Controls = () => {
  return (
    <View style={styles.container}>
      <View style={styles.controlWrapper}>
        <TouchableOpacity>
          <Image
            source={require('@/assets/plus.png')}
            style={styles.icon}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
        </TouchableOpacity>
        <Text style={[styles.description, typography.label]}>My List</Text>
      </View>

      <View style={styles.controlWrapper}>
        <TouchableOpacity>
          <Image
            source={require('@/assets/play.png')}
            style={styles.playIcon}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
        </TouchableOpacity>
        <Text style={[styles.description, typography.label]}>Play</Text>
      </View>

      <View style={styles.controlWrapper}>
        <TouchableOpacity>
          <Image
            source={require('@/assets/info.png')}
            style={styles.icon}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
        </TouchableOpacity>
        <Text style={[styles.description, typography.label]}>Info</Text>
      </View>
    </View>
  );
};

export default Controls;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    color: 'white',
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
  },
  icon: {
    width: 28,
    height: 28,
    margin: spacing.xs,
  },
  playIcon: {
    width: 28,
    height: 34,
    marginTop: 10,
    marginBottom: 2,
  },
  description: {
    color: 'white',
  },
});
