import { Linking } from 'react-native';
import { Config } from 'react-native-config';
import Toast from 'react-native-toast-message';
import { getMovieTrailer } from '@/controllers/MovieController';

export const playTrailer = async (id) => {
  try {
    const trailerData = await getMovieTrailer(id);

    if (trailerData.results.length) {
      const url = Config.VIDEO_EXTERNAL_BASE_URL + trailerData.results[0].key;

      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Toast.show({
          type: 'error',
          text1: "Something's wrong",
          text2: `Don't know how to open this URL: ${url}`,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Oops',
        text2: "There's no trailer found for this movie",
      });
    }
  } catch (e) {
    console.log(e);
  }
};
