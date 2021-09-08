import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { styles } from './MovieCollection.styles';
import { MovieItem } from '@/components';
import { getMyList } from '@/selectors/MovieListSelectors';

export const MovieCollection = () => {
  const myList = useSelector(getMyList);
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {myList && myList.length ? (
        <FlatList
          data={myList.movieList}
          renderItem={(item) => <MovieItem item={item} customStyles={movieItemStyles} />}
          numColumns={3}
          contentContainerStyle={styles.flatlist}
        />
      ) : (
        <View style={styles.container}>
          <Text style={{ color: colors.text }}>There's no movie added to My List yet</Text>
        </View>
      )}
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
    width: '100%',
    height: '100%',
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
