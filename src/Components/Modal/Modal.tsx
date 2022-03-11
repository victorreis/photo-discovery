import { TestProps } from '../../Config/Tests/Test.types';
import { CloseButton } from '../CloseButton';
import {
  ModalBackdropContainer,
  ModalContainer,
  ModalContentContainer,
} from './Modal.styles';
import { ModalProps, DefaultModalProps } from './Modal.types';

export const modalDefaults: Required<DefaultModalProps> & Required<TestProps> =
  {
    testID: 'Modal',
  };

export const Modal: React.FC<ModalProps> = (props): JSX.Element => {
  const { testID = modalDefaults.testID, children, onClose, ...others } = props;

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <ModalContainer data-testid={testID}>
      <ModalContentContainer data-testid={`${testID}_ModalContentContainer`}>
        <CloseButton onClick={handleClose} />
        {children}
      </ModalContentContainer>
      <ModalBackdropContainer
        data-testid={`${testID}_ModalBackdropContainer`}
        onClick={handleClose}
        {...others}
      />
    </ModalContainer>
  );
};
