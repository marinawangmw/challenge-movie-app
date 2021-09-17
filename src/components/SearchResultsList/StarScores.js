import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { starIcon, halfStarIcon } from '@/assets';

export const StarScores = ({ voteAverage = 0 }) => {
  const score = (voteAverage / 10) * 5;
  const scoreInt = Math.trunc(score);
  const scoreDecimals = score - scoreInt;
  const scoreDecimalFirstDigit = scoreDecimals.toString().slice(2, 3);

  const starPlaceholder = Array(scoreInt).fill(1);

  if (scoreDecimalFirstDigit >= 5) {
    starPlaceholder.push(0);
  }

  const renderStars = () => {
    return starPlaceholder.map((star, idx) => {
      if (star) {
        return (
          <Image
            key={idx}
            source={starIcon}
            accessibilityIgnoresInvertColors
            resizeMode="cover"
            style={styles.starIcon}
          />
        );
      }
      return (
        <Image
          key={idx}
          source={halfStarIcon}
          accessibilityIgnoresInvertColors
          resizeMode="cover"
          style={styles.starIcon}
        />
      );
    });
  };

  return <View style={styles.container}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  starIcon: {
    height: 15,
    width: 15,
    marginRight: 5,
  },
});
