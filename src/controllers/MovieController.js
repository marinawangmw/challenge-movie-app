import { HttpClient } from './HttpClient';

export function getTrending() {
  return HttpClient.get('/movie/top_rated', {
    params: {
      page: 1,
    },
  });
}

export function getRecentlyAdded() {
  return HttpClient.get('/discover/movie', {
    params: {
      sort_by: 'release_date.desc',
    },
  });
}

export function getAllGenre() {
  return HttpClient.get('/genre/movie/list');
}

export function getSimilarMovies(id) {
  return HttpClient.get(`/movie/${id}/similar`, {
    params: {
      page: 1,
    },
  });
}

export function getSearchesResult(query) {
  return HttpClient.get('/search/movie', {
    params: {
      page: 1,
      include_adult: false,
      query,
    },
  });
}

export function getMovieTrailer(id) {
  return HttpClient.get(`/movie/${id}/videos`);
}
