import { CustomThemeType, ThemeMode } from '../Types';

export type ThemeContextType = {
  theme: CustomThemeType;
  switchTheme: (themeMode: ThemeMode) => void;
};

export type CustomThemeProviderProps = {
  testID?: string;
  themeName?: ThemeMode;
};
