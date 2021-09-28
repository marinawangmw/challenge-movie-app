import React from 'react';
import { render } from '@testing-library/react-native';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MovieDetail } from '@/screens';
import { Controls, MessageBanner } from '@/components';
import { withProviders } from '@/test-utils';
import { movieList, navigation } from '@/test-utils/helper';

const fakeEmptyStore = {
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
      results: [],
    },
    searchResults: [],
  },
};

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
      results: [movieList],
    },
    searchResults: [],
  },
};

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
    movieDetails: movieList.movieList[0],
  },
};

describe('Movie Collection', () => {
  it('renders correcly with empty details and similar movies', () => {
    const { toJSON } = render(
      withProviders(<MovieDetail route={emptyRoute} navigation={navigation} />, {
        initialState: fakeEmptyStore,
      })
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

describe('Controls component', () => {
  it('renders correctly and match snapshot', () => {
    const controlDatas = [{ icon: null, label: 'Play', handleControlPress: () => null }];
    const { toJSON } = render(
      withProviders(
        <Controls controlDatas={controlDatas} route={routeWithData} navigation={navigation} />,
        {
          initialState: fakeStoreWithData,
        }
      )
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders all items in control datas', () => {
    const controlDatas = [
      { icon: null, label: 'Play', handleControlPress: () => null },
      { icon: null, label: 'Info', handleControlPress: () => null },
    ];
    const wrapper = shallow(
      <Controls controlDatas={controlDatas} route={routeWithData} navigation={navigation} />
    );
    expect(wrapper.find({ testID: 'controlItem' }).length).toBe(2);
  });
});

describe('Message Banner component', () => {
  it('renders correctly', () => {
    const component = shallow(<MessageBanner />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('renders correctly with message', () => {
    const message = 'Welcome!';
    const { queryByText } = render(<MessageBanner message={message} />);

    expect(queryByText('Welcome!')).not.toBeNull();
  });
});
