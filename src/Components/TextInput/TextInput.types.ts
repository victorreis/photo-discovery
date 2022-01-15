import { TestProps } from '../../Config/Tests/Test.types';

export interface RequiredTextInputProps {
  /**
   * Value to be controlled by the component.
   */
  value: string;

  /**
   * Callback function that is called when the input is changed.
   */
  onChange: (newValue: string) => void;
}

export interface DefaultTextInputProps {}

export interface OptionalTextInputProps {}

export type TextInputProps = RequiredTextInputProps &
  DefaultTextInputProps &
  OptionalTextInputProps &
  TestProps &
  Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'>;

export type TextInputStyleProps = Required<DefaultTextInputProps>;
