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

describe('button component tests', () => {
  const text = 'text';
  const newType = 'submit';
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

  describe('behavior tests', () => {
    it(`should render the component`, () => {
      expect.assertions(1);
      setup().renderJestDom();
      const testInstance = screen.getByTestId(buttonDefaults.testID);

      expect(testInstance).toBeTruthy();
    });

    it(`should render the text`, () => {
      expect.assertions(1);
      setup().renderJestDom();
      const element = screen.getByText(text);

      expect(element).toBeInTheDocument();
    });

    it(`should call the onCLick callback when the button is clicked`, () => {
      expect.assertions(1);
      setup().renderJestDom();
      const testInstance = screen.getByTestId(buttonDefaults.testID);

      fireEvent.click(testInstance);

      expect(onClick).toHaveBeenCalledWith();
    });

    it(`should render '${buttonDefaults.type}' as the default type`, () => {
      expect.assertions(1);
      const instance = setup().renderRTR().root;
      const element = instance.findByProps({
        type: buttonDefaults.type,
      });

      expect(element).toBeTruthy();
    });

    it(`should override the default type when it is passed as prop`, () => {
      expect.assertions(1);
      const instance = setup({
        ...requiredProps,
        type: newType,
      }).renderRTR().root;
      const element = instance.findByProps({ type: newType });

      expect(element).toBeTruthy();
    });
  });

  describe('style tests', () => {
    it(`should have style the correct styles`, () => {
      expect.assertions(1);
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

  describe('snapshot tests', () => {
    it(`should render correctly`, () => {
      expect.assertions(1);
      const generatedJson = setup().renderRTR().toJSON();

      expect(generatedJson).toMatchSnapshot();
    });
  });
});
