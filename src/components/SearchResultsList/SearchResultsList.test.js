import React from 'react';
import { render } from '@testing-library/react-native';
import { SearchResultsList } from '@/components';
import { withProviders } from '@/test-utils';
import { movieList, navigation } from '@/test-utils/helper';

describe('Search Results List renders correcly', () => {
  it('with empty data and title', () => {
    const title = '';
    const data = [];
    const { toJSON } = render(
      withProviders(<SearchResultsList title={title} data={data} navigation={navigation} />)
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('with data and title with data', () => {
    const title = 'test';
    const data = [movieList.movieList];

    const { toJSON } = render(
      withProviders(<SearchResultsList title={title} data={data} navigation={navigation} />)
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
