import { TestProps } from '../../Config/Tests/Test.types';

export interface RequiredCloseButtonProps {
  onClick: () => void;
}

export interface DefaultCloseButtonProps {}

export interface OptionalCloseButtonProps {}

export type CloseButtonProps = RequiredCloseButtonProps &
  DefaultCloseButtonProps &
  OptionalCloseButtonProps &
  TestProps &
  Omit<React.HTMLAttributes<HTMLButtonElement>, 'children' | 'onClick'>;

export type CloseButtonStyleProps = Required<DefaultCloseButtonProps>;
