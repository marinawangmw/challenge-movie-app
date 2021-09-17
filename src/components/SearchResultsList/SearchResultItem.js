import React from 'react';
import { TouchableOpacity, StyleSheet, View, Image, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Config } from 'react-native-config';
import { StarScores } from './StarScores';
import { playIcon } from '@/assets';
import { NAVIGATION } from '@/constants';
import { spacing, typography } from '@/theme';

const SearchResultItem = ({ item, navigation }) => {
  const { colors } = useTheme();

  const handleNavigate = (itemData) => {
    navigation.navigate(NAVIGATION.movieDetail, {
      movieDetails: itemData,
    });
  };

  return (
    <TouchableOpacity
      onPress={() => handleNavigate(item.item)}
      style={[styles.resultBlock, { backgroundColor: colors.card }]}
    >
      <Image
        source={{ uri: Config.IMAGE_API_BASE_URL + item.item.poster_path }}
        accessibilityIgnoresInvertColors
        resizeMode="cover"
        style={styles.resultPoster}
      />

      <View style={styles.resultDetail}>
        <View style={styles.resultDetailUp}>
          <Text style={[typography.text, { color: colors.text }, styles.itemTitle]}>
            {item.item.title}
          </Text>
        </View>

        <View style={styles.resultDetailBottom}>
          <StarScores voteAverage={item.item.vote_average} />
          <Image
            source={playIcon}
            style={styles.playIcon}
            accessibilityIgnoresInvertColors
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchResultItem;

const styles = StyleSheet.create({
  resultBlock: {
    margin: 2,
    flexDirection: 'row',
  },
  resultPoster: {
    width: 160,
    height: 95,
  },
  resultDetail: {
    flexDirection: 'column',
    padding: spacing.s,
    flex: 1,
    flexWrap: 'wrap',
  },
  resultDetailUp: {
    paddingBottom: spacing.s,
    width: '100%',
  },
  itemTitle: {
    flexWrap: 'wrap',
  },
  resultDetailBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playIcon: {
    width: 20,
    height: 20,
  },
});
