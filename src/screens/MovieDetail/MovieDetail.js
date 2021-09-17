import React, { useEffect } from 'react';
import { View, Image, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { Config } from 'react-native-config';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { styles, controlStyles, movieItemStyles } from './MovieDetail.styles';
import { Loading } from '@/screens';
import { Controls, MovieItem, MessageBanner } from '@/components';
import { logo, addIcon } from '@/assets';
import { typography } from '@/theme';
import { en } from '@/localization/en';
import { strings } from '@/localization';
import { addToMyList, fetchSimilarMoviesStartAsync, TYPES } from '@/actions/MovieListActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { getSimilarMovies } from '@/selectors/MovieListSelectors';

export const MovieDetail = ({ navigation, route }) => {
  const { movieDetails } = route.params;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.FETCH_SIMILAR_MOVIES], state));
  const similarMovies = useSelector(getSimilarMovies);

  useEffect(() => {
    dispatch(fetchSimilarMoviesStartAsync(movieDetails.id));
  }, [dispatch, movieDetails.id]);

  const handleControlPress = () => {
    dispatch(addToMyList(movieDetails));
  };

  const controlDatas = [{ icon: addIcon, label: strings.controls.myList, handleControlPress }];

  const renderEmptyMessage = () => {
    <MessageBanner message={en.movieDetails.noObjectMessage} />;
  };

  if (isLoading) {
    return <Loading />;
  }

  if (similarMovies.results && similarMovies.results.length) {
    return (
      <ScrollView>
        <Image
          source={{ uri: Config.IMAGE_API_BASE_URL + movieDetails.poster_path }}
          accessibilityIgnoresInvertColors
          resizeMode="cover"
          style={styles.poster}
        />
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} accessibilityIgnoresInvertColors />
          <Text style={[{ color: colors.text }, styles.title]}>{movieDetails.title}</Text>

          <View style={styles.banners}>
            <Text style={[{ color: colors.highlight }, styles.approvalBanner]}>
              {Math.trunc(movieDetails.vote_average * 10) + en.movieDetails.approval}
            </Text>
            <Text style={[{ color: colors.text }, styles.yearBanner]}>
              {movieDetails.release_date.substring(0, 4)}
            </Text>
            {!movieDetails.adult && (
              <View style={[{ backgroundColor: colors.bannerBackground }, styles.adultBanner]}>
                <Text style={[{ color: colors.bannerText }]}>{en.movieDetails.forAllAges}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity style={[{ backgroundColor: colors.text }, styles.watchButton]}>
            <Text style={styles.watchButtonLabel}>{en.movieDetails.watchTrailer}</Text>
          </TouchableOpacity>

          <Text style={[{ color: colors.text }, styles.overview, typography.text]}>
            {movieDetails.overview}
          </Text>

          <Controls
            controlDatas={controlDatas}
            controlStyles={controlStyles}
            handleControlPress={handleControlPress}
          />

          <View>
            <Text style={[styles.similarMoviesTitle, { color: colors.text }, typography.title]}>
              {en.movieDetails.title}
            </Text>
            <FlatList
              data={similarMovies.results.slice(0, 10)}
              renderItem={(movieItem) => (
                <MovieItem
                  item={movieItem}
                  customStyles={movieItemStyles}
                  navigation={navigation}
                />
              )}
              horizontal
              ListEmptyComponent={renderEmptyMessage}
              contentContainerStyle={styles.flatList}
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  return null;
};
