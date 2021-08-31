import React, { useEffect, useState, useCallback } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Config } from 'react-native-config';
import LinearGradient from 'react-native-linear-gradient';
import Labels from './Labels';
import SpecialBanner from './SpecialBanner';
import Controls from './Controls';
import { Header } from '@/components';
import { spacing } from '@/theme';
import { getTrending, getAllGenre } from '@/controllers/MovieController';

export const Hero = () => {
  const [posterURL, setPosterURL] = useState('');
  const [genreIds, setGenreIds] = useState([]);
  const [genres, setGenres] = useState([]);
  const [allGenres, setAllGenres] = useState(null);

  const { colors } = useTheme();

  const getData = useCallback(async () => {
    try {
      const responses = await Promise.all([getTrending(), getAllGenre()]);

      const posterMovieIndex = Math.floor(Math.random() * responses[0].results.length);
      const posterMovie = responses[0].results[posterMovieIndex];
      setPosterURL(posterMovie.poster_path);
      setGenreIds(posterMovie.genre_ids);

      const allGenresResult = responses[1];
      setAllGenres(allGenresResult);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (Boolean(allGenres) && genreIds.length) {
      setGenres(allGenres?.genres.filter((g) => genreIds.includes(g.id)));
    }
  }, [genreIds, allGenres]);

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <ImageBackground
        source={{ uri: Config.IMAGE_API_BASE_URL + posterURL }}
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
            <Labels labels={genres} />
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
