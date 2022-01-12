import { TestProps } from '../../Config/Tests/Test.types';
import { TypographyVariant } from '../../Theme/Types/Typographies.types';

export interface RequiredTypographyProps {
  /**
   * Component's children.
   */
  children: React.ReactNode;
}

export interface DefaultTypographyProps {
  /**
   * Sets the component variant. It changes the HTML tag and the styles.
   * @default 'body1'.
   */
  variant?: TypographyVariant;
}

export interface OptionalTypographyProps {
  /**
   * Sets the component styles.
   */
  style?: React.CSSProperties;
}

export type TypographyProps = RequiredTypographyProps &
  DefaultTypographyProps &
  OptionalTypographyProps &
  TestProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>;

export type TypographyStyleProps = Required<DefaultTypographyProps>;
