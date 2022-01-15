import {
  renderJestDomCreator,
  renderRTRCreator,
  screen,
} from '../../Config/Tests/GlobalSetup.config';
import { TextInput, textInputDefaults } from './TextInput';
import { RequiredTextInputProps, TextInputProps } from './TextInput.types';

describe(`TextInput component tests`, () => {
  const value = 'text';
  const onChange = jest.fn();

  const requiredProps: RequiredTextInputProps = {
    value,
    onChange,
  };

  const setup = (props?: TextInputProps) => {
    const renderRTR = () =>
      renderRTRCreator<TextInputProps>(TextInput, {
        ...requiredProps,
        ...props,
      });
    const renderJestDom = () =>
      renderJestDomCreator<TextInputProps>(TextInput, {
        ...requiredProps,
        ...props,
      });

    return { renderRTR, renderJestDom };
  };

  describe(`behavior tests`, () => {
    it(`should render the component`, () => {
      setup().renderJestDom();
      const testInstance = screen.getByTestId(textInputDefaults.testID);

      expect(testInstance).toBeTruthy();
    });

    // it(`should render the text`, () => {
    //   setup().renderJestDom();
    //   const element = screen.getByText(text);

    //   expect(element).toBeInTheDocument();
    // });

    // it(`should render '${textInputDefaults.variant}' as the default variant`, () => {
    //   const instance = setup().renderRTR().root;
    //   const element = instance.findByProps({
    //     variant: textInputDefaults.variant,
    //   });

    //   expect(element).toBeTruthy();
    // });

    // it(`should override the default variant when it is passed as prop`, () => {
    //   const instance = setup({
    //     ...requiredProps,
    //     variant: newVariant,
    //   }).renderRTR().root;
    //   const element = instance.findByProps({ variant: newVariant });

    //   expect(element).toBeTruthy();
    // });
  });

  // describe(`style tests`, () => {
  //   it(`should have style the Container component`, () => {
  //     setup().renderJestDom();
  //     const container = screen.getByTestId(textInputDefaults.testID);

  //     expect(container).toHaveStyle({
  //       color: hexToRgb(themes.default.colors.font.default),
  //       ...themes.default.typographies[textInputDefaults.variant],
  //     });
  //   });
  // });

  describe(`snapshot tests`, () => {
    it(`should render correctly`, () => {
      const generatedJson = setup().renderRTR().toJSON();
      expect(generatedJson).toMatchSnapshot();
    });
  });
});
