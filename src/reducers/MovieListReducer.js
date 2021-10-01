import { TYPES } from '@/actions/MovieListActions';
import { REDUX_STATUS_TYPES } from '@/actions/ReduxStatusActions';

const INITIAL_STATE = {
  errorMessage: undefined,
  myList: [],
  heroPoster: {},
  movieLists: [],
  similarMovies: [],
  searchResults: [],
};

const addMovieToMyList = (myList, movieToAdd) => {
  const existingMovie = myList.find((movie) => movie.id === movieToAdd.id);

  if (!existingMovie) {
    return [...myList, { ...movieToAdd }];
  }

  return myList;
};

const subtractMovieFromMyList = (myList, movieIdToSubtract) => {
  return myList.filter((movie) => movie.id !== movieIdToSubtract);
};

export const movieListReducer = (state = INITIAL_STATE, { payload, type }) => {
  if (type === REDUX_STATUS_TYPES.CLEAR_STORE) {
    console.log('redux status reducer: ', state, payload, type);
  }
  switch (type) {
    case TYPES.FETCH_MOVIE_LISTS_REQUEST:
      return {
        ...state,
      };

    case TYPES.FETCH_MOVIE_LISTS_SUCCESS:
      return {
        ...state,
        movieLists: payload,
      };

    case TYPES.FETCH_MOVIE_LISTS_ERROR:
      return {
        ...state,
        errorMessage: payload,
      };

    case TYPES.ADD_TO_MY_LIST:
      return { ...state, myList: addMovieToMyList(state.myList, payload) };

    case TYPES.REMOVE_FROM_MY_LIST:
      return {
        ...state,
        myList: subtractMovieFromMyList(state.myList, payload),
      };

    case TYPES.SET_HERO_POSTER:
      return {
        ...state,
        heroPoster: payload,
      };

    case TYPES.FETCH_SIMILAR_MOVIES_REQUEST:
      return {
        ...state,
      };

    case TYPES.FETCH_SIMILAR_MOVIES_SUCCESS:
      return {
        ...state,
        similarMovies: payload,
      };

    case TYPES.FETCH_SIMILAR_MOVIES_ERROR:
      return {
        ...state,
        errorMessage: payload,
      };
    case TYPES.SEARCH_MOVIES_REQUEST:
      return {
        ...state,
      };

    case TYPES.SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        searchResults: payload,
      };

    case TYPES.SEARCH_MOVIES_ERROR:
      return {
        ...state,
        errorMessage: payload,
      };

    case REDUX_STATUS_TYPES.CLEAR_STORE:
      return INITIAL_STATE;

    default:
      return state;
  }
};
