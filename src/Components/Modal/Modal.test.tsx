import {
  fireEvent,
  renderJestDomCreator,
  renderRTRCreator,
  screen,
} from '../../Config/Tests/GlobalSetup.config';
import { closeButtonDefaults } from '../CloseButton/CloseButton';
import { Modal, modalDefaults } from './Modal';
import { RequiredModalProps, ModalProps } from './Modal.types';

describe('modal component tests', () => {
  const text = 'text';
  const onClose = jest.fn();

  const modalBackdropContainerId = `${modalDefaults.testID}_ModalBackdropContainer`;

  const requiredProps: RequiredModalProps = {
    children: text,
  };

  const setup = (props?: ModalProps) => {
    const renderRTR = () =>
      renderRTRCreator<ModalProps>(Modal, {
        ...requiredProps,
        ...props,
      });
    const renderJestDom = () =>
      renderJestDomCreator<ModalProps>(Modal, {
        ...requiredProps,
        ...props,
      });

    return { renderRTR, renderJestDom };
  };

  describe('behavior tests', () => {
    it('should render the component', () => {
      expect.assertions(1);
      setup().renderJestDom();
      const testInstance = screen.getByTestId(modalDefaults.testID);

      expect(testInstance).toBeTruthy();
    });

    it('should render the text', () => {
      expect.assertions(1);
      setup().renderJestDom();
      const element = screen.getByText(text);

      expect(element).toBeInTheDocument();
    });

    it(`should call the onCLick callback when the '${modalBackdropContainerId}' is clicked`, () => {
      expect.assertions(1);

      setup({ ...requiredProps, onClose }).renderJestDom();
      const modalBackdropContainerInstance = screen.getByTestId(
        modalBackdropContainerId
      );

      fireEvent.click(modalBackdropContainerInstance);

      expect(onClose).toHaveBeenCalledWith();
    });

    it(`should call the onCLick callback when the '${closeButtonDefaults.testID}' is clicked`, () => {
      expect.assertions(1);

      setup({ ...requiredProps, onClose }).renderJestDom();
      const closeButtonInstance = screen.getByTestId(
        closeButtonDefaults.testID
      );

      fireEvent.click(closeButtonInstance);

      expect(onClose).toHaveBeenCalledWith();
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
