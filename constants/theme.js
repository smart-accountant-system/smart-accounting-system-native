import { DefaultTheme } from 'react-native-paper';
import { Platform } from 'react-native';

// const fonts = Platform.select({
//   web: {
//     regular: 'noto-medium',
//     medium: 'noto-semiBold',
//     light: 'noto-regular',
//     thin: 'noto-light',
//   },
//   ios: {
//     regular: 'noto-medium',
//     medium: 'noto-semiBold',
//     light: 'noto-regular',
//     thin: 'noto-light',
//   },
//   default: {
//     regular: 'noto-medium',
//     medium: 'noto-semiBold',
//     light: 'noto-regular',
//     thin: 'noto-light',
//   },
// });

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: '#E25141',
    primary: '#F0A33A',
    accent: '#F1EAE2',
    text: '#4A4944',
    white: '#fff',
    grey: '#888',
    receive: '#3AAC74',
    pay: '#7C2064',
  },
  // fonts,
};
