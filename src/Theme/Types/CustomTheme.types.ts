import { Borders } from './Borders.types';
import { Colors } from './Colors.types';
import { Typographies } from './Typographies.types';

const availableModes = ['light', 'dark', 'futuristic', 'deepSpace'] as const;
export type Mode = typeof availableModes[number];

export interface CustomThemeType {
  mode: Mode;
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
