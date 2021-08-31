import React from 'react';
import { StyleSheet, Text, FlatList, Image, View } from 'react-native';
import { Config } from 'react-native-config';
import { useTheme } from '@react-navigation/native';
import { typography, spacing } from '@/theme';
import { movie } from '@/assets';

export const MovieList = ({ item }) => {
  const { colors } = useTheme();

  const renderCarousel = (movieList) => {
    return (
      <>
        {movieList.item.poster_path ? (
          <Image
            source={{ uri: Config.IMAGE_API_BASE_URL + movieList.item.poster_path }}
            resizeMode="cover"
            style={styles.img}
            accessibilityIgnoresInvertColors
          />
        ) : (
          <View
            style={[
              styles.img,
              styles.unknownContainer,
              { backgroundColor: colors.posterBackground },
            ]}
          >
            <Image
              source={movie}
              resizeMode="cover"
              style={styles.unknownImg}
              accessibilityIgnoresInvertColors
            />
          </View>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }, typography.title]}>{item.title}</Text>
      <FlatList data={item.movieList} renderItem={renderCarousel} horizontal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: spacing.m,
  },
  title: {
    marginVertical: spacing.s,
  },
  img: {
    width: 90,
    height: 150,
    margin: 1,
  },
  unknownContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  unknownImg: {
    width: 50,
    height: 50,
  },
});
