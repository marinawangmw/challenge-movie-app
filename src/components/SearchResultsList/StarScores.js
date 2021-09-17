import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { starIcon, halfStarIcon } from '@/assets';

const ScoreTenBase = 10;
const ScoreFiveBase = 5;
const HalfStarMinimum = 5;

export const StarScores = ({ voteAverage = 0 }) => {
  const score = (voteAverage / ScoreTenBase) * ScoreFiveBase;
  const scoreInt = Math.trunc(score);
  const scoreDecimals = score - scoreInt;
  const scoreDecimalFirstDigit = scoreDecimals.toString().slice(2, 3);

  const starPlaceholder = Array(scoreInt).fill(1);

  if (scoreDecimalFirstDigit >= HalfStarMinimum) {
    starPlaceholder.push(0);
  }

  const starImage = (idx, icon) => (
    <Image
      key={idx}
      source={icon}
      accessibilityIgnoresInvertColors
      resizeMode="cover"
      style={styles.starIcon}
    />
  );

  const renderStars = () => {
    return starPlaceholder.map((star, idx) => {
      if (star) {
        return starImage(idx, starIcon);
      }
      return starImage(idx, halfStarIcon);
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
