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

const setHeroPosterFromData = (trending, genres, dispatch) => {
  const posterMovieIndex = Math.floor(Math.random() * trending.results.length);
  const posterMovie = trending.results[posterMovieIndex];

  const posterGenreIds = posterMovie.genre_ids;
  const allGenresResult = genres;
  const posterGenres = allGenresResult?.genres.filter((g) => posterGenreIds.includes(g.id));

  dispatch(
    setHeroPoster({
      posterUrl: posterMovie.poster_path,
      posterGenres,
    })
  );
};

export const fetchMovieListsStartAsync = () => {
  return async (dispatch) => {
    dispatch(fetchMovieListsStart());

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
