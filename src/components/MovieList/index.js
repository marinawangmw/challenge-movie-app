import React from 'react';
import { StyleSheet, Text, FlatList, ImageBackground, Image, View } from 'react-native';
import { Config } from 'react-native-config';
import { useTheme } from '@react-navigation/native';
import { typography, spacing } from '@/theme';
import { movie } from '@/assets';
import { SpecialBanner } from '@/components';

export const MovieList = ({ item }) => {
  const { colors } = useTheme();

  const renderCarousel = (movieList) => {
    return (
      <>
        {movieList.item.poster_path ? (
          <View style={styles.poster}>
            <ImageBackground
              source={{ uri: Config.IMAGE_API_BASE_URL + movieList.item.poster_path }}
              resizeMode="cover"
              style={styles.img}
              accessibilityIgnoresInvertColors
            >
              <SpecialBanner
                styles={{
                  banner: { ...styles.banner, backgroundColor: colors.secondary },
                  bannerLabel: [styles.bannerLabel, { color: colors.text }],
                }}
              />
            </ImageBackground>
          </View>
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
  poster: {
    width: 90,
    height: 150,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    zIndex: 2,
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 1,
    alignSelf: 'center',
    borderRadius: 1.25,
  },
  bannerLabel: {
    fontSize: 4.67,
    lineHeight: 5.47,
    fontWeight: 'bold',
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
