import React from 'react';
import { StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Config } from 'react-native-config';
import { useTheme } from '@react-navigation/native';
import { spacing } from '@/theme';
import { movie } from '@/assets';
import { SpecialBanner } from '@/components';
import { NAVIGATION } from '@/constants';

export const MovieItem = ({ item, customStyles, navigation }) => {
  const { colors } = useTheme();
  const styles = { ...defaultStyles, ...customStyles };

  const handleNavigate = () => {
    navigation.navigate(NAVIGATION.movieDetail, {
      movieDetails: item.item,
    });
  };

  return (
    <>
      {item && item.item.poster_path ? (
        <TouchableOpacity onPress={handleNavigate} style={styles.poster}>
          <ImageBackground
            source={{ uri: Config.IMAGE_API_BASE_URL + item.item.poster_path }}
            resizeMode="cover"
            style={styles.img}
          >
            <SpecialBanner
              styles={{
                banner: { ...styles.banner, backgroundColor: colors.secondary },
                bannerLabel: [styles.bannerLabel, { color: colors.text }],
              }}
            />
          </ImageBackground>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.img,
            styles.unknownContainer,
            { backgroundColor: colors.posterBackground },
          ]}
        >
          <Image
            source={movie}
            resizeMode="cover"
            style={styles.unknownPosterIcon}
            accessibilityIgnoresInvertColors
          />
        </TouchableOpacity>
      )}
    </>
  );
};

const defaultStyles = StyleSheet.create({
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
  unknownPosterIcon: {
    width: 50,
    height: 50,
  },
});
