import React from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import SearchResultItem from './SearchResultItem';
import { Loading } from '@/screens';
import { MessageBanner } from '@/components';
import { typography, spacing } from '@/theme';
import { en } from '@/localization/en';
import { TYPES } from '@/actions/MovieListActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

export const SearchResultsList = ({ data, navigation, title }) => {
  const { colors } = useTheme();
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.SEARCH_MOVIES], state));

  const renderEmptyMessage = () => {
    return <MessageBanner message={en.search.noObjectMessage} customStyles={message} />;
  };

  const renderHeader = () => {
    if (isLoading) {
      return <Loading customStyles={loader} />;
    }

    if (title) {
      return <Text style={[{ color: colors.text }, styles.title, typography.title]}>{title}</Text>;
    }

    return null;
  };

  return (
    <FlatList
      data={data}
      renderItem={(item) => <SearchResultItem navigation={navigation} item={item} />}
      keyExtractor={(_item, idx) => idx}
      contentContainerStyle={styles.container}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmptyMessage}
    />
  );
};

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: spacing.s,
  },
  title: {
    paddingVertical: spacing.s,
  },
});

export const loader = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const message = StyleSheet.create({
  messageContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
