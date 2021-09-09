import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { styles } from './MovieCollection.styles';
import { MovieItem } from '@/components';

const numColumns = 3;

export const MovieCollection = ({ navigation, route, noObjectMessage }) => {
  const { colors } = useTheme();
  const { movieList } = route.params.collection;
  const message = noObjectMessage || route.params.noObjectMessage || 'Nothing here yet';

  useEffect(() => {
    navigation.setOptions({ title: route.params.collection.title });
  }, [navigation, route]);

  return (
    <View style={styles.container}>
      {movieList && movieList.length ? (
        <FlatList
          data={movieList}
          renderItem={(item) => <MovieItem item={item} customStyles={movieItemStyles} />}
          numColumns={numColumns}
          contentContainerStyle={styles.flatlist}
        />
      ) : (
        <View style={styles.container}>
          <Text style={{ color: colors.text }}>{message}</Text>
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
