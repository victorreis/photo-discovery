import { App } from './App';
import {
  renderRTRCreator,
  renderJestDomCreator,
  screen,
} from './Config/Tests/GlobalSetup.config';
import { themes } from './Theme/CustomThemeProvider';

describe('App component tests', () => {
  const setup = () => {
    const renderRTR = () => renderRTRCreator(App, {});
    const renderJestDom = () => renderJestDomCreator(App, {});

    return { renderRTR, renderJestDom };
  };

  describe(`behavior tests`, () => {
    it(`should render the Typography component`, () => {
      setup().renderJestDom();
      const testInstance = screen.getByTestId('container');

      expect(testInstance).toBeTruthy();
    });
  });

  describe(`style tests`, () => {
    it(`should have style the Container component`, () => {
      setup().renderJestDom();
      const container = screen.getByTestId('container');

      expect(container).toHaveStyle({
        backgroundColor: themes.default.colors.background.default,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      });
    });
  });
});
