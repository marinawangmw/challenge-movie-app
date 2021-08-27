import { HttpClient } from './HttpClient';

export function getRecentlyAdded() {
  return HttpClient.get('/movie/top_rated', {
    params: {
      page: 1,
    },
  });
}

export function getTrending() {
  return HttpClient.get('/discover/movie', {
    params: {
      sort_by: 'release_date.asc',
    },
  });
}

export function getAllGenre() {
  return HttpClient.get('/genre/movie/list');
}
