import {
  fireEvent,
  renderJestDomCreator,
  renderRTRCreator,
  screen,
} from '../../Config/Tests/GlobalSetup.config';
import { CloseButton, closeButtonDefaults } from './CloseButton';
import {
  RequiredCloseButtonProps,
  CloseButtonProps,
} from './CloseButton.types';

describe('closeButton component tests', () => {
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

  describe('behavior tests', () => {
    it('should render the component', () => {
      expect.assertions(1);
      setup().renderJestDom();
      const testInstance = screen.getByTestId(closeButtonDefaults.testID);

      expect(testInstance).toBeTruthy();
    });

    it('should call the onCLick callback when the button is clicked', () => {
      expect.assertions(1);
      setup().renderJestDom();
      const testInstance = screen.getByTestId(closeButtonDefaults.testID);

      fireEvent.click(testInstance);

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('snapshot tests', () => {
    it('should render correctly', () => {
      expect.assertions(1);

      const generatedJson = setup().renderRTR().toJSON();
      expect(generatedJson).toMatchSnapshot();
    });
  });
});
