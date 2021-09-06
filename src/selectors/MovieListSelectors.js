export const getMyList = (state) => {
  return state.movieList.myList;
};

export const isMovieListsFetching = (state) => {
  return state.movieList.isFetching;
};

export const getMovieLists = (state) => {
  return state.movieList.movieLists;
};

export const getHeroPoster = (state) => {
  return state.movieList.heroPoster;
};
