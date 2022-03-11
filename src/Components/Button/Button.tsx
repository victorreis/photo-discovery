import { TestProps } from '../../Config/Tests/Test.types';
import { ButtonContainer } from './Button.styles';
import { ButtonProps, DefaultButtonProps } from './Button.types';

export const buttonDefaults: Required<DefaultButtonProps> &
  Required<TestProps> = {
  testID: 'Button',
  type: 'button',
};

export const Button: React.FC<ButtonProps> = (props): JSX.Element => {
  const {
    testID = buttonDefaults.testID,
    children,
    type = buttonDefaults.type,
    onClick,
    ...others
  } = props;

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <ButtonContainer
      data-testid={testID}
      onClick={handleClick}
      type={type}
      {...others}
    >
      {children}
    </ButtonContainer>
  );
};
