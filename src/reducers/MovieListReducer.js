import { TYPES } from '@/actions/MovieListActions';

const INITIAL_STATE = {
  isFetching: false,
  errorMessage: undefined,
  myList: [],
  heroPoster: {},
  movieLists: [],
};

const addMovieToMyList = (myList, movieToAdd) => {
  const existingMovie = myList.find((movie) => movie.id === movieToAdd.id);

  if (!existingMovie) {
    return [...myList, { ...movieToAdd }];
  }

  return myList;
};

const subtractMovieFromMyList = (myList, movieToSubtract) => {
  return myList.filter((movie) => movie.id !== movieToSubtract.id);
};

export const movieListReducer = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case TYPES.FETCH_MOVIE_LISTS_START:
      return {
        ...state,
        isFetching: true,
      };

    case TYPES.FETCH_MOVIE_LISTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        movieLists: payload,
      };

    case TYPES.FETCH_MOVIE_LISTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: payload,
      };

    case TYPES.ADD_TO_MY_LIST:
      return { ...state, myList: addMovieToMyList(state.myList, payload) };

    case TYPES.REMOVE_FROM_MT_LIST:
      return {
        ...state,
        myList: subtractMovieFromMyList(state.myList, payload),
      };

    case TYPES.SET_HERO_POSTER:
      return {
        ...state,
        heroPoster: payload,
      };

    default:
      return state;
  }
};
