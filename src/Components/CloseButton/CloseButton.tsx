import { MdOutlineClose } from 'react-icons/md';

import { useTheme } from 'styled-components';

import { TestProps } from '../../Config/Tests/Test.types';
import { iconSizes } from '../../Theme/Types';
import {
  CloseButtonContainer,
  TransparentContainer,
} from './CloseButton.styles';
import { CloseButtonProps, DefaultCloseButtonProps } from './CloseButton.types';

export const closeButtonDefaults: Required<DefaultCloseButtonProps> &
  Required<TestProps> = {
  testID: 'CloseButton',
};

export const CloseButton: React.FC<CloseButtonProps> = (props): JSX.Element => {
  const theme = useTheme();
  const { testID = closeButtonDefaults.testID, onClick, ...others } = props;

  return (
    <CloseButtonContainer data-testid={testID} onClick={onClick} {...others}>
      <MdOutlineClose
        color={theme.colors.background.default.lightest}
        onClick={onClick}
        size={iconSizes.md}
      />
      <TransparentContainer />
    </CloseButtonContainer>
  );
};
