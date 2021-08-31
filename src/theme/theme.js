import { DarkTheme, DefaultTheme } from '@react-navigation/native';

const defaultColors = {
  primary: '#000000',
  secondary: '#0578FF',
  error: '#D32F2F',
  text: '#FFFFFF',
  border: '#171717',
  activeTab: '#0578FF',
  inactiveTab: '#FFFFFF',
  card: '#171717',
  background: '#000000',
  posterBackground: '#f2f2f2',
};

export const theme = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...defaultColors,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      ...defaultColors,
    },
  },
};
