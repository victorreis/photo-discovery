import { HiColorSwatch } from 'react-icons/hi';

import { useTheme } from 'styled-components';

import { TestProps } from '../../Config/Tests/Test.types';
import { Logo, NavbarContainer } from './Navbar.styles';
import { DefaultNavbarProps, NavbarProps } from './Navbar.types';

export const navbarDefaults: Required<DefaultNavbarProps> &
  Required<TestProps> = {
  testID: 'Navbar',
};

export const Navbar: React.FC<NavbarProps> = (props): JSX.Element => {
  const theme = useTheme();
  const { testID = navbarDefaults.testID } = props;

  return (
    <NavbarContainer data-testid={testID}>
      <Logo variant="h3">
        <span>
          <span className="larger">P</span>
          hoto
        </span>

        <span>
          <span className="larger">D</span>
          iscovery
        </span>
      </Logo>

      <HiColorSwatch fill={theme.colors.main.effect.light} size={24} />
    </NavbarContainer>
  );
};
