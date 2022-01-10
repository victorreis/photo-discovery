import { CustomThemeType, Mode } from '../Types';

export type ThemeContextType = {
  theme: CustomThemeType;
  switchTheme: (themeMode: Mode) => void;
};

export type CustomThemeProviderProps = { testID?: string; themeName?: Mode };
