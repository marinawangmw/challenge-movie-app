import React from 'react';
import { render } from '@testing-library/react-native';
import { MovieList } from '@/components';
import { withProviders } from '@/test-utils';
import { movieList } from '@/test-utils/helper';

describe('Movie List renders correcly', () => {
  it('with empty movie list', () => {
    const item = { movieList: [], title: 'test' };
    const { toJSON } = render(withProviders(<MovieList item={item} />));
    expect(toJSON()).toMatchSnapshot();
  });

  it('with movie list with data', () => {
    const { toJSON } = render(withProviders(<MovieList item={movieList} />));
    expect(toJSON()).toMatchSnapshot();
  });
});
