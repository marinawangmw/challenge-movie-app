import React from 'react';
import { render } from '@testing-library/react-native';
import { MovieDetail } from '@/screens';
import { withProviders } from '@/test-utils';

const fakeStoreWithData = {
  error: {},
  status: {},
  user: {},
  movieList: {
    errorMessage: undefined,
    myList: [],
    heroPoster: {},
    movieLists: [],
    similarMovies: {
      page: 1,
      results: [
        {
          adult: false,
          backdrop_path: '/ziTxBaF1AhbUwcv2IBiFJAf54qD.jpg',
          id: 65086,
          overview: 'The story follows a young lawyer, Arthur Kipps.',
          popularity: 16.334,
          poster_path: '/aJbeDPUwDe9MLpseTFrNTBaQPzf.jpg',
          release_date: '2012-02-03',
          title: 'The Woman in Black',
          vote_average: 6.11,
        },
        {
          adult: false,
          id: 102899,
          overview:
            'Armed with the astonishing ability to shrink in scale but increase in strength.',
          popularity: 69.704,
          poster_path: '/rS97hUJ1otKTTripGwQ0ujbuIri.jpg',
          release_date: '2015-07-14',
          title: 'Ant-Man',
          vote_average: 7.088,
        },
      ],
    },
    searchResults: [],
  },
};

const navigation = { navigate: jest.fn(), getParam: jest.fn(), setOptions: jest.fn() };

const emptyRoute = {
  params: {
    movieDetails: {
      id: null,
      poster_path: '',
      title: 'test',
      vote_average: null,
      adult: undefined,
      release_date: null,
      overview: '',
    },
  },
};

const routeWithData = {
  params: {
    movieDetails: {
      id: 592350,
      poster_path: '/zGVbrulkupqpbwgiNedkJPyQum4.jpg',
      title: 'test',
      vote_average: 8.5,
      adult: false,
      release_date: '2019-12-20',
      overview: 'Class 1-A visits Nabu Island where they finally get to do some real hero work. ',
    },
  },
};

describe('Movie Collection', () => {
  it('renders correcly with empty details and similar movies', () => {
    const { toJSON } = render(
      withProviders(<MovieDetail route={emptyRoute} navigation={navigation} />)
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correcly with data on details and similar movies', () => {
    const { toJSON } = render(
      withProviders(<MovieDetail route={routeWithData} navigation={navigation} />, {
        initialState: fakeStoreWithData,
      })
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
