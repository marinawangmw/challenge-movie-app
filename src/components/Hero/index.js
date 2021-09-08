import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { Config } from 'react-native-config';
import LinearGradient from 'react-native-linear-gradient';
import Labels from './Labels';
import SpecialBanner from './SpecialBanner';
import Controls from './Controls';
import { Header } from '@/components';
import { spacing } from '@/theme';
import { getHeroPoster } from '@/selectors/MovieListSelectors';

export const Hero = () => {
  const heroPoster = useSelector(getHeroPoster);

  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <ImageBackground
        source={{ uri: Config.IMAGE_API_BASE_URL + heroPoster.posterUrl }}
        resizeMode="cover"
        style={styles.imgBg}
      >
        <LinearGradient
          locations={[0.0001, 1]}
          colors={['rgba(0, 0, 0, 0.0001)', '#000']}
          style={styles.gradient}
        >
          <Header />
          <View style={styles.bottomContainer}>
            <Labels labels={heroPoster.posterGenres} />
            <SpecialBanner />
            <Controls />
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
  imgBg: {
    width: '100%',
  },
  bottomContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    padding: spacing.s,
  },
});
