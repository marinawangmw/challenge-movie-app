import { Linking } from 'react-native';
import { Config } from 'react-native-config';
import Toast from 'react-native-toast-message';
import { getMovieTrailer } from '@/controllers/MovieController';
import { en } from '@/localization/en';

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
          text1: en.toast.somethingWrong,
          text2: en.toast.unableToOpen + url,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: en.toast.errorTitle,
        text2: en.toast.noTrailerFound,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
