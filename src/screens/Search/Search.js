import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import debounce from 'lodash.debounce';
import { styles } from './Search.styles';
import { SearchResultsList } from '@/components';
import { SearchBar } from '@/components/SearchResultsList/SearchBar';
import { TYPES, searchMoviesStartAsync } from '@/actions/MovieListActions';
import { getMovieLists, getSearchResults } from '@/selectors/MovieListSelectors';
import { successSelector } from '@/selectors/StatusSelectors';
import { en } from '@/localization/en';

const SearchDebounce = 300;
const MinCharForSearch = 3;

export const Search = ({ navigation }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const searchResults = useSelector(getSearchResults);

  const successFetchedMovies = useSelector((state) =>
    successSelector([TYPES.FETCH_MOVIE_LISTS], state)
  );
  const movieLists = useSelector(getMovieLists);

  const handleInputChange = async (text) => {
    setInput(text);

    if (text.trim() !== '' && text.length >= MinCharForSearch) {
      try {
        debounce(() => {
          dispatch(searchMoviesStartAsync(text));
        }, SearchDebounce)();
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (successFetchedMovies && movieLists[1].movieList.length) {
    return (
      <SafeAreaView style={styles.container}>
        <SearchBar input={input} setInput={handleInputChange} />
        <SearchResultsList
          navigation={navigation}
          data={input.length >= 3 ? searchResults : movieLists[1].movieList.slice(0, 5)}
          title={input.length < 3 && en.search.popularSearches}
        />
      </SafeAreaView>
    );
  }

  return null;
};
