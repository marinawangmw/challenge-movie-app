import { render } from '@testing-library/react-native';
import React from 'react';
import { Home } from '@/screens/Home/Home';
import { withProviders } from '@/test-utils';

const fakeStore = {
  error: {},
  status: {},
  user: {
    username: 'johndoe',
  },
};

describe('Home', () => {
  it('should match the snapshot', () => {
    const { toJSON } = render(withProviders(<Home />, { initialState: fakeStore }));

    expect(toJSON()).toMatchSnapshot();
  });
});
