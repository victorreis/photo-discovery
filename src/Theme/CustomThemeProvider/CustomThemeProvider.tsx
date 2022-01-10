import React, { useMemo, useState } from 'react';

import { ThemeProvider } from 'styled-components';

import {
  lightTheme,
  darkTheme,
  futuristicTheme,
  deepSpaceTheme,
} from '../Modes';
import { Mode, CustomThemeType } from '../Types';
import {
  ThemeContextType,
  CustomThemeProviderProps,
} from './CustomThemeProvider.types';

export const themes: Record<Mode | 'default', CustomThemeType> = {
  default: deepSpaceTheme,
  light: lightTheme,
  dark: darkTheme,
  futuristic: futuristicTheme,
  deepSpace: deepSpaceTheme,
};

export const ThemeContext = React.createContext<
  ThemeContextType | Record<string, never>
>({});

export const customThemeProviderDefaults: Required<CustomThemeProviderProps> = {
  testID: 'ThemeContextProvider',
  themeName: 'deepSpace',
};

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = (
  props
): JSX.Element => {
  const {
    testID = customThemeProviderDefaults.testID,
    children,
    themeName = customThemeProviderDefaults.themeName,
  } = props;

  const [theme, setTheme] = useState<CustomThemeType>(themes[themeName]);

  const switchTheme = (themeMode: Mode): void => {
    setTheme(themes[themeMode]);
  };

  const providerValue = useMemo(() => ({ theme, switchTheme }), [theme]);

  return (
    <ThemeContext.Provider data-testid={testID} value={providerValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
