import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { Config } from 'react-native-config';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { styles, controlStyles, movieItemStyles } from './MovieDetail.styles';
import { Loading } from '@/screens';
import { Controls, MovieItem, MessageBanner } from '@/components';
import { logo, addIcon, minusIcon } from '@/assets';
import { typography } from '@/theme';
import { en } from '@/localization/en';
import { strings } from '@/localization';
import {
  addToMyList,
  fetchSimilarMoviesStartAsync,
  removeFromMyList,
  TYPES,
} from '@/actions/MovieListActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { getMyList, getSimilarMovies } from '@/selectors/MovieListSelectors';
import { playTrailer } from '@/components/helper';

export const MovieDetail = ({ navigation, route }) => {
  const { movieDetails } = route.params;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.FETCH_SIMILAR_MOVIES], state));
  const similarMovies = useSelector(getSimilarMovies);
  const myList = useSelector(getMyList);

  const [controlDatas, setControlDatas] = useState([]);

  useEffect(() => {
    dispatch(fetchSimilarMoviesStartAsync(movieDetails.id));
  }, [dispatch, movieDetails.id]);

  const handleAddToMyList = useCallback(() => {
    dispatch(addToMyList(movieDetails));
    Toast.show({
      type: 'success',
      text1: 'Hooray!',
      text2: 'Successfully added to my list!',
    });
  }, [dispatch, movieDetails]);

  const handleRemoveFromMyList = useCallback(() => {
    dispatch(removeFromMyList(movieDetails.id));
    Toast.show({
      type: 'success',
      text1: 'Hooray!',
      text2: 'Successfully deleted from my list!',
    });
  }, [dispatch, movieDetails.id]);

  useEffect(() => {
    const existsInMyList = myList.filter((movie) => movie.id === movieDetails.id);

    if (existsInMyList.length) {
      setControlDatas([
        {
          icon: minusIcon,
          label: strings.controls.myList,
          handleControlPress: handleRemoveFromMyList,
        },
      ]);
    } else {
      setControlDatas([
        { icon: addIcon, label: strings.controls.myList, handleControlPress: handleAddToMyList },
      ]);
    }
  }, [handleAddToMyList, handleRemoveFromMyList, movieDetails.id, myList]);

  const renderEmptyMessage = () => {
    <MessageBanner message={en.movieDetails.noObjectMessage} />;
  };

  const handlePlayTrailer = () => {
    playTrailer(movieDetails.id);
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
          <TouchableOpacity
            onPress={handlePlayTrailer}
            style={[{ backgroundColor: colors.text }, styles.watchButton]}
          >
            <Text style={styles.watchButtonLabel}>{en.movieDetails.watchTrailer}</Text>
          </TouchableOpacity>

          <Text style={[{ color: colors.text }, styles.overview, typography.text]}>
            {movieDetails.overview}
          </Text>

          <Controls
            controlDatas={controlDatas}
            controlStyles={controlStyles}
            handleControlPress={handleAddToMyList}
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
