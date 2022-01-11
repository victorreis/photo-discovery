import { Borders } from './Borders.types';
import { Colors } from './Colors.types';
import { Typographies } from './Typographies.types';

export const availableThemeModes = ['dark', 'deepSpace'] as const;
export type ThemeMode = typeof availableThemeModes[number];

export interface CustomThemeType {
  mode: ThemeMode;
  colors: Colors;
  borders: Borders;
  typographies: Typographies;

  //! To be implemented
  opacities: undefined;
  shadows: undefined;
  spacings: undefined;
  acessibilities: undefined;
  animations: undefined;
}
