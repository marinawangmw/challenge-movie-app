import { StyleSheet } from 'react-native';
import { spacing } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
  imgBg: {
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    padding: spacing.s,
  },
});
