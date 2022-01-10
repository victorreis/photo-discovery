import { TestProps } from '../../Config/Tests/Test.types';
import { TypographyVariant } from '../../Theme/Types/Typographies.types';

export interface RequiredTypographyProps {
  children: string;
}

export interface DefaultTypographyProps {
  variant?: TypographyVariant;
}

export interface OptionalTypographyProps {
  style?: CSSStyleDeclaration;
}

export type TypographyProps = RequiredTypographyProps &
  DefaultTypographyProps &
  OptionalTypographyProps &
  TestProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>;

export type TypographyStyleProps = Required<DefaultTypographyProps>;
