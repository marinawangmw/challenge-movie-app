import { getTrending, getRecentlyAdded, getAllGenre } from '@/controllers/MovieController';
import { strings } from '@/localization';

export const TYPES = {
  ADD_TO_MY_LIST: 'ADD_TO_MY_LIST',
  REMOVE_FROM_MT_LIST: 'REMOVE_FROM_MT_LIST',
  FETCH_MOVIE_LISTS_START: 'FETCH_MOVIE_LISTS_START',
  FETCH_MOVIE_LISTS_SUCCESS: 'FETCH_MOVIE_LISTS_SUCCESS',
  FETCH_MOVIE_LISTS_FAILURE: 'FETCH_MOVIE_LISTS_FAILURE',
  SET_HERO_POSTER: 'SET_HERO_POSTER',
};

export const fetchMovieListsStart = () => ({
  type: TYPES.FETCH_MOVIE_LISTS_START,
});

export const fetchMovieListsSuccess = (movieLists) => ({
  type: TYPES.FETCH_MOVIE_LISTS_SUCCESS,
  payload: movieLists,
});

export const fetchMovieListsFailure = (errorMessage) => ({
  type: TYPES.FETCH_MOVIE_LISTS_FAILURE,
  payload: errorMessage,
});

export const setHeroPoster = (heroPoster) => ({
  type: TYPES.SET_HERO_POSTER,
  payload: heroPoster,
});

export const fetchMovieListsStartAsync = () => {
  return async (dispatch, getState) => {
    dispatch(fetchMovieListsStart());

    try {
      const responses = await Promise.all([getTrending(), getRecentlyAdded(), getAllGenre()]);
      const myList = getState().movieList.myList;
      const trendingNow = responses[0].results.slice(0, 10);
      const recentlyAdded = responses[1].results.slice(0, 10);

      const posterMovieIndex = Math.floor(Math.random() * responses[0].results.length);
      const posterMovie = responses[0].results[posterMovieIndex];

      const posterGenreIds = posterMovie.genre_ids;
      const allGenresResult = responses[2];
      const posterGenres = allGenresResult?.genres.filter((g) => posterGenreIds.includes(g.id));

      dispatch(
        setHeroPoster({
          posterUrl: posterMovie.poster_path,
          posterGenres,
        })
      );

      dispatch(
        fetchMovieListsSuccess([
          { title: strings.movieLists.myList, movieList: myList },

          { title: strings.movieLists.trending, movieList: trendingNow },

          { title: strings.movieLists.recentlyAdded, movieList: recentlyAdded },
        ])
      );
    } catch (error) {
      dispatch(fetchMovieListsFailure(error.message));
    }
  };
};

export const addToMyList = (movie) => ({
  type: TYPES.ADD_TO_MY_LIST,
  payload: movie,
});

export const removeFromMyList = (movie) => ({
  type: TYPES.REMOVE_FROM_MT_LIST,
  payload: movie,
});
