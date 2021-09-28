import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { Config } from 'react-native-config';
import LinearGradient from 'react-native-linear-gradient';
import Labels from './Labels';
import { Header, SpecialBanner, Controls } from '@/components';
import { spacing, typography } from '@/theme';
import { getHeroPoster } from '@/selectors/MovieListSelectors';
import { addIcon, playIcon, infoIcon } from '@/assets';
import { strings } from '@/localization';
import { addToMyList } from '@/actions/MovieListActions';
import { NAVIGATION } from '@/constants';

export const Hero = ({ navigation }) => {
  const { colors } = useTheme();
  const heroPoster = useSelector(getHeroPoster);
  const dispatch = useDispatch();

  const handleMyListIconPress = () => {
    dispatch(addToMyList(heroPoster.posterMovie));
  };

  const handleInfoIconPress = () => {
    navigation.navigate(NAVIGATION.movieDetail, {
      movieDetails: heroPoster.posterMovie,
    });
  };

  const controlDatas = [
    { icon: addIcon, label: strings.controls.myList, handleControlPress: handleMyListIconPress },
    { icon: playIcon, label: strings.controls.play },
    { icon: infoIcon, label: strings.controls.info, handleControlPress: handleInfoIconPress },
  ];

  if (heroPoster && heroPoster.posterMovie) {
    return (
      <View style={[styles.container, { backgroundColor: colors.primary }]}>
        <ImageBackground
          source={{ uri: Config.IMAGE_API_BASE_URL + heroPoster.posterMovie.poster_path }}
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
              <SpecialBanner
                styles={{
                  banner: { ...styles.banner, backgroundColor: `${colors.secondary}4A` },
                  bannerLabel: [styles.bannerLabel, typography.label, { color: colors.secondary }],
                }}
              />
              <Controls controlDatas={controlDatas} controlStyles={controlStyles} />
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  }

  return null;
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
  banner: {
    marginVertical: spacing.s,
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 60,
  },
  bannerLabel: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

const controlStyles = StyleSheet.create({
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
});
