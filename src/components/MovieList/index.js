import React from 'react';
import { StyleSheet, Text, FlatList, View, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { typography, spacing } from '@/theme';
import { MovieItem, MessageBanner } from '@/components';
import { NAVIGATION } from '@/constants';
import { en } from '@/localization/en';

const windowWidth = Dimensions.get('window').width;

export const MovieList = ({ navigation, item }) => {
  const { colors } = useTheme();

  const handlePress = () => {
    navigation.navigate(NAVIGATION.movieCollection, {
      collection: item,
      noObjectMessage: en.movieLists.noObjectMessage,
    });
  };

  const renderEmptyMessage = () => (
    <MessageBanner
      message={en.movieLists.noObjectMessage}
      customStyles={{
        messageContainer: { ...styles.messageContainer, backgroundColor: colors.card },
      }}
    />
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={[styles.title, { color: colors.text }, typography.title]}>{item.title}</Text>
      </TouchableOpacity>
      <FlatList
        data={item.movieList}
        renderItem={(movieItem) => <MovieItem item={movieItem} customStyles={movieItemStyles} />}
        horizontal
        ListEmptyComponent={renderEmptyMessage}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: spacing.m,
  },
  title: {
    paddingVertical: spacing.s,
  },
  messageContainer: {
    height: 120,
    flexGrow: 1,
    marginVertical: spacing.xs,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    flexGrow: 1,
  },
});

const movieItemStyles = StyleSheet.create({
  poster: {
    width: 90,
    height: 150,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 90,
    height: 150,
    margin: 1,
  },
  banner: {
    zIndex: 2,
    position: 'absolute',
    bottom: spacing.m,
    paddingHorizontal: spacing.xs,
    paddingVertical: 1,
    alignSelf: 'center',
    borderRadius: 1.25,
  },
  bannerLabel: {
    fontSize: 4.67,
    lineHeight: 5.47,
    fontWeight: 'bold',
  },
});
