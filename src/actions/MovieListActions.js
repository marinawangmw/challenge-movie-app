import { setLastFetch } from './ReduxStatusActions';
import {
  getTrending,
  getRecentlyAdded,
  getAllGenre,
  getSimilarMovies,
  getSearchesResult,
} from '@/controllers/MovieController';
import { strings } from '@/localization';

export const TYPES = {
  ADD_TO_MY_LIST: 'ADD_TO_MY_LIST',
  REMOVE_FROM_MY_LIST: 'REMOVE_FROM_MY_LIST',

  FETCH_MOVIE_LISTS: 'FETCH_MOVIE_LISTS',
  FETCH_MOVIE_LISTS_REQUEST: 'FETCH_MOVIE_LISTS_REQUEST',
  FETCH_MOVIE_LISTS_SUCCESS: 'FETCH_MOVIE_LISTS_SUCCESS',
  FETCH_MOVIE_LISTS_ERROR: 'FETCH_MOVIE_LISTS_ERROR',

  SET_HERO_POSTER: 'SET_HERO_POSTER',

  FETCH_SIMILAR_MOVIES: 'FETCH_SIMILAR_MOVIES',
  FETCH_SIMILAR_MOVIES_REQUEST: 'FETCH_SIMILAR_MOVIES_REQUEST',
  FETCH_SIMILAR_MOVIES_SUCCESS: 'FETCH_SIMILAR_MOVIES_SUCCESS',
  FETCH_SIMILAR_MOVIES_ERROR: 'FETCH_SIMILAR_MOVIES_ERROR',

  SEARCH_MOVIES: 'SEARCH_MOVIES',
  SEARCH_MOVIES_REQUEST: 'SEARCH_MOVIES_REQUEST',
  SEARCH_MOVIES_SUCCESS: 'SEARCH_MOVIES_SUCCESS',
  SEARCH_MOVIES_ERROR: 'SEARCH_MOVIES_ERROR',
};

export const fetchMovieListsRequest = () => ({
  type: TYPES.FETCH_MOVIE_LISTS_REQUEST,
});

export const fetchMovieListsSuccess = (movieLists) => ({
  type: TYPES.FETCH_MOVIE_LISTS_SUCCESS,
  payload: movieLists,
});

export const fetchMovieListsError = (errorMessage) => ({
  type: TYPES.FETCH_MOVIE_LISTS_ERROR,
  payload: errorMessage,
});

export const setHeroPoster = (heroPoster) => ({
  type: TYPES.SET_HERO_POSTER,
  payload: heroPoster,
});

const setHeroPosterFromData = (trending, genres, dispatch) => {
  const posterMovieIndex = Math.floor(Math.random() * trending.results.length);
  const posterMovie = trending.results[posterMovieIndex];

  const posterGenreIds = posterMovie.genre_ids;
  const allGenresResult = genres;
  const posterGenres = allGenresResult?.genres.filter((g) => posterGenreIds.includes(g.id));

  dispatch(
    setHeroPoster({
      posterMovie,
      posterGenres,
    })
  );
};

export const fetchMovieListsStartAsync = () => {
  return async (dispatch) => {
    dispatch(fetchMovieListsRequest());

    const datetimeOfNow = new Date();
    dispatch(setLastFetch(datetimeOfNow));

    try {
      const responses = await Promise.all([getTrending(), getRecentlyAdded(), getAllGenre()]);
      const trendingNow = responses[0].results.slice(0, 10);
      const recentlyAdded = responses[1].results.slice(0, 10);
      setHeroPosterFromData(responses[0], responses[2], dispatch);

      dispatch(
        fetchMovieListsSuccess([
          { title: strings.movieLists.trending, movieList: trendingNow },

          { title: strings.movieLists.recentlyAdded, movieList: recentlyAdded },
        ])
      );
    } catch (error) {
      dispatch(fetchMovieListsError(error.message));
    }
  };
};

export const addToMyList = (movie) => ({
  type: TYPES.ADD_TO_MY_LIST,
  payload: movie,
});

export const removeFromMyList = (movieId) => ({
  type: TYPES.REMOVE_FROM_MY_LIST,
  payload: movieId,
});

export const fetchSimilarMoviesRequest = () => ({
  type: TYPES.FETCH_SIMILAR_MOVIES_REQUEST,
});

export const fetchSimilarMoviesSuccess = (movieLists) => ({
  type: TYPES.FETCH_SIMILAR_MOVIES_SUCCESS,
  payload: movieLists,
});

export const fetchSimilarMoviesError = (errorMessage) => ({
  type: TYPES.FETCH_SIMILAR_MOVIES_ERROR,
  payload: errorMessage,
});

export const fetchSimilarMoviesStartAsync = (movieId) => {
  return async (dispatch) => {
    if (movieId) {
      dispatch(fetchSimilarMoviesRequest());
      try {
        const similarMovies = await getSimilarMovies(movieId);
        dispatch(fetchSimilarMoviesSuccess(similarMovies));
      } catch (error) {
        dispatch(fetchSimilarMoviesError(error.message));
      }
    }
  };
};

export const searchMoviesRequest = () => ({
  type: TYPES.SEARCH_MOVIES_REQUEST,
});

export const searchMoviesSuccess = (movieLists) => ({
  type: TYPES.SEARCH_MOVIES_SUCCESS,
  payload: movieLists,
});

export const searchMoviesError = (errorMessage) => ({
  type: TYPES.SEARCH_MOVIES_ERROR,
  payload: errorMessage,
});

export const searchMoviesStartAsync = (query) => {
  return async (dispatch) => {
    if (query) {
      dispatch(searchMoviesRequest());

      try {
        const searchResult = await getSearchesResult(query);

        dispatch(searchMoviesSuccess(searchResult.results));
      } catch (e) {
        dispatch(searchMoviesError(e));
      }
    }
  };
};
