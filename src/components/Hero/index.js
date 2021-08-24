import React, { useEffect, useState, useCallback } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Config } from 'react-native-config';
import LinearGradient from 'react-native-linear-gradient';
import Header from './Header';
import Labels from './Labels';
import SpecialBanner from './SpecialBanner';
import Controls from './Controls';
import { spacing } from '@/theme';
import { getTrending, getAllGenre } from '@/controllers/MovieController';

export const Hero = () => {
  const [posterURL, setPosterURL] = useState('');
  const [genreIds, setGenreIds] = useState([]);
  const [genres, setGenres] = useState([]);

  const getData = useCallback(async () => {
    try {
      const trendingMovies = await getTrending();
      setPosterURL(trendingMovies.results[0].poster_path);
      setGenreIds(trendingMovies.results[0].genre_ids);

      const allGenres = await getAllGenre();
      setGenres(allGenres.genres.filter((g) => genreIds.includes(g.id)));
    } catch (e) {
      console.log(e);
    }
  }, [genreIds]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <View style={styles.container}>
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
    backgroundColor: 'black',
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
  imgBg: {
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    padding: spacing.s,
  },
});
