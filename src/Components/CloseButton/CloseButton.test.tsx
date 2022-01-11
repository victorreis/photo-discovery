import {
  renderJestDomCreator,
  renderRTRCreator,
  screen,
} from '../../Config/Tests/GlobalSetup.config';
import { CloseButton, closeButtonDefaults } from './CloseButton';
import {
  RequiredCloseButtonProps,
  CloseButtonProps,
} from './CloseButton.types';

describe(`CloseButton component tests`, () => {
  const onClick = jest.fn();

  const requiredProps: RequiredCloseButtonProps = {
    onClick,
  };

  const setup = (props?: CloseButtonProps) => {
    const renderRTR = () =>
      renderRTRCreator<CloseButtonProps>(CloseButton, {
        ...requiredProps,
        ...props,
      });
    const renderJestDom = () =>
      renderJestDomCreator<CloseButtonProps>(CloseButton, {
        ...requiredProps,
        ...props,
      });

    return { renderRTR, renderJestDom };
  };

  describe(`behavior tests`, () => {
    it(`should render the component`, () => {
      setup().renderJestDom();
      const testInstance = screen.getByTestId(closeButtonDefaults.testID);

      expect(testInstance).toBeTruthy();
    });
  });

  describe(`snapshot tests`, () => {
    it(`should render correctly`, () => {
      const generatedJson = setup().renderRTR().toJSON();
      expect(generatedJson).toMatchSnapshot();
    });
  });
});
