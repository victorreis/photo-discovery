import { CustomThemeType } from '../Types';
import { lightTheme } from './Light.theme';

export const futuristicTheme: CustomThemeType = {
  ...lightTheme,
  mode: 'futuristic',

  colors: {
    ...lightTheme.colors,
    main: {
      ...lightTheme.colors.main,
      primary: {
        lightest: '#e8e8ee',
        lighter: '#a5a3bb',
        light: '#615d89',
        normal: '#1d1856',
        dark: '#171345',
        darker: '#110e34',
        darkest: '#09071a',
      },
      secondary: {
        lightest: '#f9e6fb',
        lighter: '#e799f1',
        light: '#d44de6',
        normal: '#c200db',
        dark: '#9b00af',
        darker: '#740083',
        darkest: '#3a0042',
      },
      detail: {
        lightest: '#e6fafc',
        lighter: '#b3f1f7',
        light: '#80e7f2',
        normal: '#00cfe5',
        dark: '#007c89',
        darker: '#003e45',
        darkest: '#001517',
      },
      effect: {
        lightest: '#fde6f1',
        lighter: '#f8b3d5',
        light: '#f480ba',
        normal: '#e80074',
        dark: '#a20051',
        darker: '#74003a',
        darkest: '#460023',
      },
    },
    background: {
      default: '#e8e8ee',
      highContrast: '#09071a',
    },
    font: {
      primary: '#110e34',
      secondary: '#740083',
      detail: '#003e45',
      effect: '#74003a',
      error: '#333',
      warning: '#333',
      info: '#333',
      success: '#333',
      white: '#fff',
      black: '#000',
      default: '#333',
      caption: '#555',
      hint: '#777',
      disabled: '#aaa',
    },
  },
};
