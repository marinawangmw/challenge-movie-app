import React from 'react';
import { StyleSheet, ImageBackground, Image, View } from 'react-native';
import { Config } from 'react-native-config';
import { useTheme } from '@react-navigation/native';
import { spacing } from '@/theme';
import { movie } from '@/assets';
import { SpecialBanner } from '@/components';

export const MovieItem = ({ item, customStyles }) => {
  const { colors } = useTheme();
  const styles = { ...defaultStyles, ...customStyles };

  return (
    <>
      {item && item.item.poster_path ? (
        <View style={styles.poster}>
          <ImageBackground
            source={{ uri: Config.IMAGE_API_BASE_URL + item.item.poster_path }}
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
            style={styles.unknownPosterIcon}
            accessibilityIgnoresInvertColors
          />
        </View>
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
