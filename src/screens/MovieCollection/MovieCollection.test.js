import React from 'react';
import renderer from 'react-test-renderer';
import { MovieCollection } from '@/screens';

const emptyRoute = { params: { collection: [{ movieList: [], title: 'test empty' }] } };
const routeWithData = {
  params: {
    collection: [
      {
        movieList: [
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
        title: 'test with data',
      },
    ],
  },
};

const navigation = { navigate: jest.fn(), getParam: jest.fn(), setOptions: jest.fn() };

describe('Movie Collection renders correcly', () => {
  it('with empty route', () => {
    const tree = renderer
      .create(<MovieCollection route={emptyRoute} navigation={navigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('with route with data of movie list', () => {
    const tree = renderer
      .create(<MovieCollection route={routeWithData} navigation={navigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
