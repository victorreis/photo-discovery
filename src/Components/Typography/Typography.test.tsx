import {
  renderJestDomCreator,
  renderRTRCreator,
  screen,
} from '../../Config/Tests/GlobalSetup.config';
import { themes } from '../../Theme/CustomThemeProvider';
import { hexToRgb } from '../../Utils/Transform';
import { Typography, typographyDefaults } from './Typography';
import { RequiredTypographyProps, TypographyProps } from './Typography.types';

describe(`Typography component tests`, () => {
  const text = 'text';
  const newVariant = 'h1';

  const requiredProps: RequiredTypographyProps = {
    children: text,
  };

  const setup = (props?: TypographyProps) => {
    const renderRTR = () =>
      renderRTRCreator<TypographyProps>(Typography, {
        ...requiredProps,
        ...props,
      });
    const renderJestDom = () =>
      renderJestDomCreator<TypographyProps>(Typography, {
        ...requiredProps,
        ...props,
      });

    return { renderRTR, renderJestDom };
  };

  describe(`behavior tests`, () => {
    it(`should render the component`, () => {
      setup().renderJestDom();
      const testInstance = screen.getByTestId(typographyDefaults.testID);

      expect(testInstance).toBeTruthy();
    });

    it(`should render the text`, () => {
      setup().renderJestDom();
      const element = screen.getByText(text);

      expect(element).toBeInTheDocument();
    });

    it(`should render '${typographyDefaults.variant}' as the default variant`, () => {
      const instance = setup().renderRTR().root;
      const element = instance.findByProps({
        variant: typographyDefaults.variant,
      });

      expect(element).toBeTruthy();
    });

    it(`should override the default variant when it is passed as prop`, () => {
      const instance = setup({
        ...requiredProps,
        variant: newVariant,
      }).renderRTR().root;
      const element = instance.findByProps({ variant: newVariant });

      expect(element).toBeTruthy();
    });
  });

  describe(`style tests`, () => {
    it(`should have style the Container component`, () => {
      setup().renderJestDom();
      const container = screen.getByTestId(typographyDefaults.testID);

      expect(container).toHaveStyle({
        color: hexToRgb(themes.default.colors.font.default),
        ...themes.default.typographies[typographyDefaults.variant],
      });
    });
  });

  describe(`snapshot tests`, () => {
    it(`should render correctly`, () => {
      const generatedJson = setup().renderRTR().toJSON();
      expect(generatedJson).toMatchSnapshot();
    });
  });
});
