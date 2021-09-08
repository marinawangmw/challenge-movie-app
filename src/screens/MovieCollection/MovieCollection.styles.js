import { StyleSheet } from 'react-native';
import { spacing } from '@/theme/spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlist: {
    paddingVertical: spacing.xl,
  },
  text: {
    alignSelf: 'center',
  },
});
