import React from 'react';
import { StyleSheet, Text, FlatList, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { typography, spacing } from '@/theme';
import { MovieItem, MessageBanner } from '@/components';
import { NAVIGATION } from '@/constants';

export const MovieList = ({ navigation, item }) => {
  const { colors } = useTheme();

  const handlePress = () => {
    navigation.navigate(NAVIGATION.movieCollection, {
      collection: item,
      noObjectMessage: "There's no movie added to My List yet",
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={[styles.title, { color: colors.text }, typography.title]}>{item.title}</Text>
      </TouchableOpacity>
      {item.movieList.length ? (
        <FlatList
          data={item.movieList}
          renderItem={(movieItem) => <MovieItem item={movieItem} customStyles={movieItemStyles} />}
          horizontal
        />
      ) : (
        <MessageBanner
          customStyles={{
            messageContainer: { ...styles.messageContainer, backgroundColor: colors.card },
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: spacing.m,
  },
  title: {
    paddingVertical: 10,
  },
  messageContainer: {
    height: 120,
    width: '100%',
    marginVertical: spacing.xs,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
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
