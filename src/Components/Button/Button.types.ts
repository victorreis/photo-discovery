import { TestProps } from '../../Config/Tests/Test.types';

export const availableButtonTypes = ['button', 'submit'] as const;
export type ButtonType = typeof availableButtonTypes[number];

export interface RequiredButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export interface DefaultButtonProps {
  type?: ButtonType;
}

export interface OptionalButtonProps {
  style?: React.CSSProperties;
}

export type ButtonProps = RequiredButtonProps &
  DefaultButtonProps &
  OptionalButtonProps &
  TestProps &
  Omit<React.HTMLAttributes<HTMLButtonElement>, 'children' | 'onClick'>;

export type ButtonStyleProps = Required<DefaultButtonProps>;
