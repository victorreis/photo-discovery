import { TestProps } from '../../Config/Tests/Test.types';

export const availableButtonTypes = ['button', 'submit'] as const;
export type ButtonType = typeof availableButtonTypes[number];

export interface RequiredButtonProps {
  /**
   * Component's children.
   */
  children: React.ReactNode;

  /**
   * Callback function that is called when the componentis clicked.
   */
  onClick: () => void;
}

export interface DefaultButtonProps {
  /**
   * Sets the button type.
   * @default 'button'.
   */
  type?: ButtonType;
}

export interface OptionalButtonProps {
  /**
   * Sets the component styles.
   */
  style?: React.CSSProperties;
}

export type ButtonProps = RequiredButtonProps &
  DefaultButtonProps &
  OptionalButtonProps &
  TestProps &
  Omit<React.HTMLAttributes<HTMLButtonElement>, 'children' | 'onClick'>;

export type ButtonStyleProps = Required<DefaultButtonProps>;
