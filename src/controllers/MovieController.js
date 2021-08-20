import { HttpClient } from './HttpClient';
import { Config } from 'react-native-config';

export function getRecentlyAdded() {
  return HttpClient.get('/movie/top_rated', {
    params: {
      api_key: Config.API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
}

export function getTrending() {
  return HttpClient.get('/discover/movie', {
    params: {
      api_key: Config.API_KEY,
      language: 'en-US',
      sort_by: 'release_date.asc',
    },
  });
}
