import React from 'react';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Search } from '@/screens';
import { SearchResultsList } from '@/components';
import { SearchBar } from '@/components/SearchResultsList/SearchBar';
import SearchResultItem from '@/components/SearchResultsList/SearchResultItem';
import { StarScores } from '@/components/SearchResultsList/StarScores';
import { withProviders } from '@/test-utils';
import { navigation, movieList } from '@/test-utils/helper';

const fakeEmptyStore = {
  error: {},
  status: {},
  user: {},
  movieList: {
    errorMessage: undefined,
    myList: [],
    heroPoster: { posterMovie: null, posterGenres: [] },
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
    heroPoster: { posterMovie: movieList.movieList[0], posterGenres: ['drama', 'romance'] },
    movieLists: [],
    similarMovies: {
      page: 1,
      results: [],
    },
    searchResults: [],
  },
};

describe('Search component', () => {
  it('renders correcly with empty hero poster', () => {
    const { toJSON } = render(
      withProviders(<Search navigation={navigation} />, {
        initialState: fakeEmptyStore,
      })
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correcly with data on hero poster', () => {
    const { toJSON } = render(
      withProviders(<Search navigation={navigation} />, {
        initialState: fakeStoreWithData,
      })
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('Search bar component', () => {
  it('renders correctly and match snapshot', () => {
    const input = '';
    const setInput = () => null;

    const { toJSON } = render(<SearchBar input={input} setInput={setInput} />);
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('Search results list', () => {
  it('renders correctly and match snapshot', () => {
    const { toJSON } = render(
      withProviders(<SearchResultsList navigation={navigation} />, {
        initialState: fakeEmptyStore,
      })
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with data', () => {
    const data = movieList.movieList;
    const { toJSON } = render(
      withProviders(<SearchResultsList data={data} navigation={navigation} />, {
        initialState: fakeStoreWithData,
      })
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with title', () => {
    const title = 'Popular results';
    const { queryByText } = render(
      withProviders(<SearchResultsList navigation={navigation} title={title} />, {
        initialState: fakeEmptyStore,
      })
    );
    expect(queryByText('Popular results')).not.toBeNull();
  });
});

describe('Search results item', () => {
  it('renders correctly and match snapshot', () => {
    const item = { item: movieList.movieList[0] };
    const { toJSON } = render(
      withProviders(<SearchResultItem item={item} navigation={navigation} />, {
        initialState: fakeEmptyStore,
      })
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('Star scores component', () => {
  it('renders correctly with no prop passed', () => {
    const tree = renderer.create(<StarScores />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly passing a prop', () => {
    const voteAverage = 9.9;

    const tree = renderer.create(<StarScores voteAverage={voteAverage} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const voteAverage = 9.9;

    const component = shallow(<StarScores voteAverage={voteAverage} />);

    expect(component.length).toBe(1);
  });

  it('renders correct amount of stars', () => {
    const voteAverage = 9.9;

    const component = shallow(<StarScores voteAverage={voteAverage} />);

    expect(component.find({ testID: 'stars' }).length).toBe(5);
  });
});
