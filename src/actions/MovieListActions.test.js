import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  TYPES,
  addToMyList,
  removeFromMyList,
  setHeroPoster,
  fetchMovieListsStartAsync,
  fetchSimilarMoviesStartAsync,
  searchMoviesStartAsync,
} from '@/actions/MovieListActions';
import { movieList } from '@/test-utils/helper';

const fakeStoreWithMoviesInMovieList = {
  error: {},
  status: {},
  user: {},
  movieList: {
    errorMessage: undefined,
    myList: movieList.movieList,
    heroPoster: { posterMovie: null, posterGenres: [] },
    movieLists: [],
    similarMovies: {
      page: 1,
      results: [],
    },
    searchResults: [],
  },
};

const addToMyListActions = [
  {
    type: TYPES.ADD_TO_MY_LIST,
    payload: movieList.movieList[0],
  },
];

const removeFromMyListActions = [
  {
    type: TYPES.REMOVE_FROM_MY_LIST,
    payload: movieList.movieList[1].id,
  },
];

const heroPosterActions = [
  {
    type: TYPES.SET_HERO_POSTER,
    payload: movieList.movieList[0],
  },
];

const fetchMovieListsActions = [
  {
    type: TYPES.FETCH_MOVIE_LISTS_REQUEST,
    payload: null,
  },
  {
    type: TYPES.FETCH_MOVIE_LISTS_SUCCESS,
    payload: movieList.longList,
  },
  {
    type: TYPES.FETCH_MOVIE_LISTS_ERROR,
    payload: null,
  },
];

const fetchSimilarMoviesActions = [
  {
    type: TYPES.FETCH_SIMILAR_MOVIES_REQUEST,
    payload: null,
  },
  {
    type: TYPES.FETCH_SIMILAR_MOVIES_SUCCESS,
    payload: movieList.similarMoviesResults,
  },
  {
    type: TYPES.FETCH_SIMILAR_MOVIES_ERROR,
    payload: null,
  },
];

const searchMoviesActions = [
  {
    type: TYPES.SEARCH_MOVIES_REQUEST,
    payload: null,
  },
  {
    type: TYPES.SEARCH_MOVIES_SUCCESS,
    payload: movieList.searchMoviesResults,
  },
  {
    type: TYPES.SEARCH_MOVIES_ERROR,
    payload: null,
  },
];

describe('addToMyListActions', () => {
  let store;
  let mockStore;

  beforeEach(() => {
    mockStore = configureStore([thunk]);
    store = mockStore({});
  });

  it('should create an action for add to my list', async () => {
    await store.dispatch(addToMyList(movieList.movieList[0]));
    const actions = store.getActions();
    expect(actions).toEqual(addToMyListActions);
  });
});

describe('setHeroPosterACtions', () => {
  let store;
  let mockStore;

  beforeEach(() => {
    mockStore = configureStore([thunk]);
    store = mockStore({});
  });

  it('should create an action for set hero poster', async () => {
    await store.dispatch(setHeroPoster(movieList.movieList[0]));
    const actions = store.getActions();
    expect(actions).toEqual(heroPosterActions);
  });
});

describe('remove from my list', () => {
  let store;
  let mockStore;

  beforeEach(() => {
    mockStore = configureStore([thunk]);
    store = mockStore(fakeStoreWithMoviesInMovieList);
  });

  it('should create an action for remove from my list', async () => {
    await store.dispatch(removeFromMyList(movieList.movieList[1].id));
    const actions = store.getActions();
    expect(actions).toEqual(removeFromMyListActions);
  });
});

describe('fetchMovieListsActions', () => {
  let store;
  let mockStore;

  beforeEach(() => {
    mockStore = configureStore([thunk]);
    store = mockStore({});
  });

  it('should create an action for fetch movie lists', async () => {
    await store.dispatch(fetchMovieListsStartAsync());
    const actions = store.getActions();
    expect(actions).toEqual(fetchMovieListsActions);
  });
});

describe('fetchSimilarMoviesActions', () => {
  let store;
  let mockStore;

  beforeEach(() => {
    mockStore = configureStore([thunk]);
    store = mockStore({});
  });

  it('should create an action for similar movies', async () => {
    await store.dispatch(fetchSimilarMoviesStartAsync('372058'));
    const actions = store.getActions();
    expect(actions).toEqual(fetchSimilarMoviesActions);
  });
});

describe('searchMoviesActions', () => {
  let store;
  let mockStore;

  beforeEach(() => {
    mockStore = configureStore([thunk]);
    store = mockStore({});
  });

  it('should create an action for similar movies', async () => {
    await store.dispatch(searchMoviesStartAsync('you'));
    const actions = store.getActions();
    expect(actions).toEqual(searchMoviesActions);
  });
});
