import { TestProps } from '../../Config/Tests/Test.types';
import { typographyVariantToTag } from '../../Theme/Types/Typographies.types';
import { TypographyContainer } from './Typography.styles';
import { TypographyProps, DefaultTypographyProps } from './Typography.types';

export const typographyDefaults: Required<DefaultTypographyProps> &
  Required<TestProps> = {
  testID: 'Typography',
  variant: 'body1',
};

export const Typography: React.FC<TypographyProps> = (props): JSX.Element => {
  const {
    testID = typographyDefaults.testID,
    children,
    variant = typographyDefaults.variant,
    ...others
  } = props;

  return (
    <TypographyContainer
      as={typographyVariantToTag[variant]}
      data-testid={testID}
      variant={variant}
      {...others}
    >
      {children}
    </TypographyContainer>
  );
};
