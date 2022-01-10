import 'styled-components';
import { CustomThemeType } from './Theme/Types';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends CustomThemeType {}
}
