import { StyleSheet, Dimensions } from 'react-native';
import { spacing } from '@/theme';

const windowWidth = Dimensions.width;

export const styles = StyleSheet.create({
  container: {
    padding: spacing.s,
  },
  poster: {
    width: windowWidth,
    height: 200,
  },
  logo: {
    width: 75,
    height: 40,
    marginVertical: spacing.s,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
  },
  banners: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  approvalBanner: {
    fontWeight: '800',
    paddingRight: spacing.m,
  },
  yearBanner: {
    fontWeight: '800',
    paddingRight: spacing.m,
  },
  adultBanner: {
    padding: 5,
  },
  watchButton: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: spacing.xs,
  },
  watchButtonLabel: {
    fontWeight: '800',
  },
  overview: {
    textAlign: 'justify',
    marginVertical: spacing.xs,
  },
  addButton: {
    width: 30,
    height: 30,
    margin: spacing.xs,
  },
  similarMoviesTitle: {
    paddingVertical: spacing.s,
  },
});

export const controlStyles = StyleSheet.create({
  controlWrapper: {
    paddingVertical: spacing.s,
  },
});

export const movieItemStyles = StyleSheet.create({
  poster: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  img: {
    width: 105,
    height: 160,
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
    fontSize: 8,
    fontWeight: 'bold',
  },
});
