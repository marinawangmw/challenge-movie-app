import { strings } from '@/localization';

export const getMyList = (state) => {
  return state.movieList.myList;
};

export const isMovieListsFetching = (state) => {
  return state.movieList.isFetching;
};

export const getMovieLists = (state) => {
  return [
    { title: strings.movieLists.myList, movieList: state.movieList.myList },
    ...state.movieList.movieLists,
  ];
};

export const getHeroPoster = (state) => {
  return state.movieList.heroPoster;
};

export const getSimilarMovies = (state) => {
  return state.movieList.similarMovies;
};

export const getSearchResults = (state) => {
  return state.movieList.searchResults;
};
