import { CustomThemeType } from '../Types';
import { lightTheme } from './Light.theme';

export const darkTheme: CustomThemeType = {
  ...lightTheme,
  mode: 'dark',

  colors: {
    ...lightTheme.colors,
    main: {
      ...lightTheme.colors.main,
      primary: {
        lightest: '#09071a',
        lighter: '#110e34',
        light: '#171345',
        normal: '#1d1856',
        dark: '#615d89',
        darker: '#a5a3bb',
        darkest: '#e8e8ee',
      },
      secondary: {
        lightest: '#3a0042',
        lighter: '#740083',
        light: '#9b00af',
        normal: '#c200db',
        dark: '#d44de6',
        darker: '#e799f1',
        darkest: '#f9e6fb',
      },
      detail: {
        lightest: '#00292e',
        lighter: '#006873',
        light: '#0091a0',
        normal: '#00cfe5',
        dark: '#80e7f2',
        darker: '#b3f1f7',
        darkest: '#e6fafc',
      },
      effect: {
        lightest: '#460023',
        lighter: '#74003a',
        light: '#a20051',
        normal: '#e80074',
        dark: '#f480ba',
        darker: '#f8b3d5',
        darkest: '#fde6f1',
      },
    },
    background: {
      default: '#09071a',
      highContrast: '#e8e8ee',
    },
    font: {
      primary: '#a5a3bb',
      secondary: '#e799f1',
      detail: '#b3f1f7',
      effect: '#f8b3d5',
      error: '#333',
      warning: '#333',
      info: '#333',
      success: '#333',
      white: '#000',
      black: '#fff',
      default: '#eee',
      caption: '#bbb',
      hint: '#999',
      disabled: '#555',
    },
  },
};
