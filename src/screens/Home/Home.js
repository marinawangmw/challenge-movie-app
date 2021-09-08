import React, { useEffect } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Hero, MovieList } from '@/components';
import { Loading } from '@/screens';
import { fetchMovieListsStartAsync, TYPES } from '@/actions/MovieListActions';
import { getMovieLists } from '@/selectors/MovieListSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

export function Home() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.FETCH_MOVIE_LISTS], state));

  const movieLists = useSelector(getMovieLists);

  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    dispatch(fetchMovieListsStartAsync());
  }, [dispatch]);

  const renderItem = (item) => <MovieList item={item.item} />;

  const renderHome = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (movieLists) {
      return (
        <FlatList
          data={movieLists}
          renderItem={renderItem}
          keyExtractor={(_item, idx) => idx}
          ListHeaderComponent={Hero}
          ListHeaderComponentStyle={{ height: windowHeight * 0.8 }}
        />
      );
    }
  };

  return <>{renderHome()}</>;
}
