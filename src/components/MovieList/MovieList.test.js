import React from 'react';
import { render } from '@testing-library/react-native';
import { MovieList } from '@/components';
import { withProviders } from '@/test-utils';

describe('Movie List renders correcly', () => {
  it('with empty movie list', () => {
    const item = { movieList: [], title: 'test' };
    const { toJSON } = render(withProviders(<MovieList item={item} />));
    expect(toJSON()).toMatchSnapshot();
  });

  it('with movie list with data', () => {
    const item = {
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
      title: 'test',
    };
    const { toJSON } = render(withProviders(<MovieList item={item} />));
    expect(toJSON()).toMatchSnapshot();
  });
});
