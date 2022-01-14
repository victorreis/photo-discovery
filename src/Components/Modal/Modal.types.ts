import { TestProps } from '../../Config/Tests/Test.types';

export interface RequiredModalProps {
  /**
   * Component's children.
   */
  children: React.ReactNode;
}

export interface DefaultModalProps {}

export interface OptionalModalProps {
  /**
   * Callback function that is called when the modal backdrop is closed.
   */
  onClose?: () => void;

  /**
   * Sets the component styles.
   */
  style?: React.CSSProperties;
}

export type ModalProps = RequiredModalProps &
  DefaultModalProps &
  OptionalModalProps &
  TestProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;

export type ModalStyleProps = Required<DefaultModalProps>;
