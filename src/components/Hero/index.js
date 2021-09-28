import React from 'react';
import { View, ImageBackground, StyleSheet, Linking, Alert } from 'react-native';
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
import { getMovieTrailer } from '@/controllers/MovieController';

export const Hero = ({ navigation }) => {
  const heroPoster = useSelector(getHeroPoster);
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const handleMyListIconPress = () => {
    dispatch(addToMyList(heroPoster.posterMovie));
  };

  const handleInfoIconPress = () => {
    navigation.navigate(NAVIGATION.movieDetail, {
      movieDetails: heroPoster.posterMovie,
    });
  };

  const handlePlayTrailer = async () => {
    try {
      const trailerData = await getMovieTrailer(heroPoster.posterMovie.id);

      if (trailerData.results.length) {
        const url = Config.VIDEO_EXTERNAL_BASE_URL + trailerData.results[0].key;

        const supported = await Linking.canOpenURL(url);

        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert(`Don't know how to open this URL: ${url}`);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const controlDatas = [
    { icon: addIcon, label: strings.controls.myList, handleControlPress: handleMyListIconPress },
    { icon: playIcon, label: strings.controls.play, handleControlPress: handlePlayTrailer },
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
