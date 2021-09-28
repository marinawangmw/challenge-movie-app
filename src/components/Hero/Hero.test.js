import React from 'react';
import { render } from '@testing-library/react-native';
import { withProviders } from '@/test-utils';
import { Hero } from '@/components';

describe('Hero renders correcly', () => {
  it('should match the snapshot', () => {
    const { toJSON } = render(withProviders(<Hero />));
    expect(toJSON()).toMatchSnapshot();
  });
});
