import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';
import { withProviders } from '@/test-utils';
import { MovieCollection } from '@/screens';
import { movieList, navigation } from '@/test-utils/helper';
import { MovieItem } from '@/components';

const emptyRoute = { params: { collection: [{ movieList: [], title: 'test empty' }] } };
const routeWithData = {
  params: {
    collection: [],
  },
};

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

  it('with all items in movie list', () => {
    const component = shallow(<MovieCollection route={routeWithData} navigation={navigation} />);
    expect(component.length).toBe(1);
  });

  it('with no object message', () => {
    const noObjectMessage = 'Nothing found';
    const { queryByText } = render(
      withProviders(
        <MovieCollection
          route={emptyRoute}
          navigation={navigation}
          noObjectMessage={noObjectMessage}
        />
      )
    );

    expect(queryByText('Nothing found')).not.toBeNull();
  });

  it('should render all items', () => {
    const wrapper = shallow(
      withProviders(<MovieCollection route={routeWithData} navigation={navigation} />)
    );

    wrapper.find({ testID: 'movieItem' }).forEach((node, index) => {
      expect(node.props().children).toBe(routeWithData.params.collection[index].title);
    });
  });
});

describe('Movie item component', () => {
  it('renders correctly and match snapshot', () => {
    const item = { item: movieList.movieList[0] };
    const tree = renderer
      .create(<MovieItem item={item} route={emptyRoute} navigation={navigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
