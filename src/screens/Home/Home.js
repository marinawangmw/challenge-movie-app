import React, { useEffect } from 'react';
import { Dimensions, FlatList, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { Hero, MovieList } from '@/components';
import { Loading } from '@/screens';
import { fetchMovieListsStartAsync, TYPES } from '@/actions/MovieListActions';
import { getMovieLists } from '@/selectors/MovieListSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { getLastFetch } from '@/selectors/ReduxStatusSelectors';
import { clearStore } from '@/actions/ReduxStatusActions';

const dateToDayUnit = 1000 * 60 * 60 * 24;

export function Home({ navigation }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.FETCH_MOVIE_LISTS], state));
  const lastFetch = useSelector(getLastFetch);

  const movieLists = useSelector(getMovieLists);

  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    dispatch(fetchMovieListsStartAsync());
  }, [dispatch]);

  useEffect(() => {
    if (lastFetch) {
      const now = new Date();
      const dateDiff = now - lastFetch;
      const daysSinceLastFetch = Math.floor(dateDiff / dateToDayUnit);

      if (daysSinceLastFetch > 1) {
        dispatch(clearStore());
        Toast.show({
          type: 'success',
          text1: 'Hooray!',
          text2: 'Cleared oudated data',
        });
      }
    }
  }, [lastFetch, dispatch]);

  const renderItem = (item) => <MovieList item={item.item} navigation={navigation} />;

  const renderHome = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (movieLists) {
      return (
        <>
          <FlatList
            data={movieLists}
            renderItem={renderItem}
            keyExtractor={(_item, idx) => idx}
            ListHeaderComponent={() => <Hero navigation={navigation} />}
            ListHeaderComponentStyle={{ height: windowHeight * 0.8 }}
          />
        </>
      );
    }
  };

  return <>{renderHome()}</>;
}
