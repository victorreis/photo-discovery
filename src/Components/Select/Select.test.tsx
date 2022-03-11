import {
  renderJestDomCreator,
  renderRTRCreator,
  screen,
} from '../../Config/Tests/GlobalSetup.config';
import { themes } from '../../Theme/CustomThemeProvider';
import { hexToRgb, toPx } from '../../Utils/Transform';
import { Select, selectDefaults } from './Select';
import { RequiredSelectProps, SelectOption, SelectProps } from './Select.types';

describe('select component tests', () => {
  const options: SelectOption[] = [
    { id: 1, value: 1, text: 'test1' },
    { id: 2, value: 2, text: 'test2' },
    { id: 3, value: 3, text: 'test3' },
  ];
  const onChange = jest.fn();

  const requiredProps: RequiredSelectProps = {
    options,
    onChange,
  };

  const setup = (props?: SelectProps) => {
    const renderRTR = () =>
      renderRTRCreator<SelectProps>(Select, {
        ...requiredProps,
        ...props,
      });
    const renderJestDom = () =>
      renderJestDomCreator<SelectProps>(Select, {
        ...requiredProps,
        ...props,
      });

    return { renderRTR, renderJestDom };
  };

  describe('behavior tests', () => {
    it(`should render the component`, () => {
      expect.assertions(1);
      setup().renderJestDom();
      const testInstance = screen.getByTestId(selectDefaults.testID);

      expect(testInstance).toBeTruthy();
    });
  });

  describe('style tests', () => {
    it(`should have style the Container component`, () => {
      expect.assertions(1);
      setup().renderJestDom();
      const container = screen.getByTestId(selectDefaults.testID);

      expect(container).toHaveStyle({
        backgroundColor: hexToRgb(
          themes.default.colors.background.default.lightest
        ),
        borderRadius: toPx(themes.default.borders.radius.LG),
        ...themes.default.typographies.body1,
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
