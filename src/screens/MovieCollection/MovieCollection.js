import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { styles } from './MovieCollection.styles';
import { MovieItem, MessageBanner } from '@/components';
import { en } from '@/localization/en';

const numColumns = 3;

export const MovieCollection = ({ navigation, route, noObjectMessage }) => {
  const { movieList } = route.params.collection;
  const message = noObjectMessage || route.params.noObjectMessage || en.movieLists.noObjectMessage;

  useEffect(() => {
    navigation.setOptions({ title: route.params.collection.title });
  }, [navigation, route]);

  const renderEmptyMessage = () => (
    <MessageBanner
      message={message}
      customStyles={{
        messageContainer: styles.container,
      }}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movieList}
        renderItem={(item) => <MovieItem item={item} customStyles={movieItemStyles} />}
        numColumns={numColumns}
        contentContainerStyle={styles.flatlist}
        ListEmptyComponent={renderEmptyMessage}
      />
    </View>
  );
};

const movieItemStyles = StyleSheet.create({
  poster: {
    width: 110,
    height: 200,
    resizeMode: 'contain',
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 110,
    height: 200,
    margin: 1,
  },
  banner: {
    zIndex: 2,
    position: 'absolute',
    bottom: 30,
    paddingHorizontal: 15,
    paddingVertical: 1,
    alignSelf: 'center',
    borderRadius: 1.57,
  },
  bannerLabel: {
    fontSize: 5.9,
    lineHeight: 7,
    fontWeight: 'bold',
    letterSpacing: 0.27,
  },
});