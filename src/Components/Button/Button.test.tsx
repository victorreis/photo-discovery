import {
  fireEvent,
  renderJestDomCreator,
  renderRTRCreator,
  screen,
} from '../../Config/Tests/GlobalSetup.config';
import { themes } from '../../Theme/CustomThemeProvider';
import { hexToRgb, toPx } from '../../Utils/Transform';
import { Button, buttonDefaults } from './Button';
import { RequiredButtonProps, ButtonProps } from './Button.types';

describe(`Button component tests`, () => {
  const text = 'text';
  const onClick = jest.fn();

  const requiredProps: RequiredButtonProps = {
    children: text,
    onClick,
  };

  const setup = (props?: ButtonProps) => {
    const renderRTR = () =>
      renderRTRCreator<ButtonProps>(Button, {
        ...requiredProps,
        ...props,
      });
    const renderJestDom = () =>
      renderJestDomCreator<ButtonProps>(Button, {
        ...requiredProps,
        ...props,
      });

    return { renderRTR, renderJestDom };
  };

  describe(`behavior tests`, () => {
    it(`should render the component`, () => {
      setup().renderJestDom();
      const testInstance = screen.getByTestId(buttonDefaults.testID);

      expect(testInstance).toBeTruthy();
    });

    it(`should render the text`, () => {
      setup().renderJestDom();
      const element = screen.getByText(text);

      expect(element).toBeInTheDocument();
    });

    it(`should call the onCLick callback when the button is clicked`, () => {
      setup().renderJestDom();
      const testInstance = screen.getByTestId(buttonDefaults.testID);

      fireEvent.click(testInstance);
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe(`style tests`, () => {
    it(`should have style the correct styles`, () => {
      setup().renderJestDom();
      const container = screen.getByTestId(buttonDefaults.testID);

      expect(container).toHaveStyle({
        backgroundColor: hexToRgb(
          themes.default.colors.background.default.darkest
        ),
        borderRadius: toPx(themes.default.borders.radius.LG),
        color: hexToRgb(themes.default.colors.background.default.lightest),
        ...themes.default.typographies.button,
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
