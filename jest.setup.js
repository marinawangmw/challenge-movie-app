import { NativeModules } from 'react-native';
import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

NativeModules.ReactLocalization = {
  language: 'en',
};

global.__reanimatedWorkletInit = jest.fn();

jest.mock('react-native-reanimated', () => ({
  ...jest.requireActual('react-native-reanimated/mock'),
  useSharedValue: jest.fn,
  useAnimatedStyle: jest.fn,
  withTiming: jest.fn,
  withSpring: jest.fn,
  withRepeat: jest.fn,
  withSequence: jest.fn,
  useAnimatedProps: jest.fn,
  Easing: {
    linear: jest.fn,
    elastic: jest.fn,
  },
}));

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn().mockResolvedValueOnce(),
  show: jest.fn().mockResolvedValueOnce(),
  getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
}));

jest.mock('react-native-config', () => ({
  Config: {
    API_BASE_URL: 'XXX',
    BUILD_VARIANT: 'TEST',
  },
}));

/**
 * Set up Enzyme to mount to DOM, simulate events,
 * and inspect the DOM in tests.
 */
Enzyme.configure({ adapter: new Adapter() });

const mockConsoleMethod = (realConsoleMethod) => {
  const ignoredMessages = ['test was not wrapped in act(...)'];

  return (message, ...args) => {
    const containsIgnoredMessage = ignoredMessages.some((ignoredMessage) =>
      message.includes(ignoredMessage)
    );

    if (!containsIgnoredMessage) {
      realConsoleMethod(message, ...args);
    }
  };
};

// Suppress console errors and warnings to avoid polluting output in tests.
console.warn = jest.fn(mockConsoleMethod(console.warn));
console.error = jest.fn(mockConsoleMethod(console.error));
