import React, { useEffect } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Hero, MovieList } from '@/components';
import { Loading } from '@/screens';
import { fetchMovieListsStartAsync } from '@/actions/MovieListActions';
import { getMovieLists, isMovieListsFetching } from '@/selectors/MovieListSelectors';

export function Home() {
  const dispatch = useDispatch();
  const isFetching = useSelector(isMovieListsFetching);
  const movieLists = useSelector(getMovieLists);

  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    dispatch(fetchMovieListsStartAsync());
  }, [dispatch]);

  const renderItem = (item) => <MovieList item={item.item} />;

  const renderHome = () => {
    if (isFetching) {
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
