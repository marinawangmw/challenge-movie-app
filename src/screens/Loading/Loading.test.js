import React from 'react';
import renderer from 'react-test-renderer';
import { Loading } from '@/screens';

describe('Loading renders correcly', () => {
  it('should match the snapshot', () => {
    const tree = renderer.create(<Loading />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
