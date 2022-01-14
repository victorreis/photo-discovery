import { useState } from 'react';
import { HiColorSwatch } from 'react-icons/hi';

import { useTheme } from 'styled-components';

import { TestProps } from '../../Config/Tests/Test.types';
import { ThemeContext } from '../../Theme/CustomThemeProvider';
import { availableThemeModes, iconSizes, ThemeMode } from '../../Theme/Types';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { Typography } from '../Typography';
import { Logo, NavbarContainer } from './Navbar.styles';
import { DefaultNavbarProps, NavbarProps } from './Navbar.types';

export const navbarDefaults: Required<DefaultNavbarProps> &
  Required<TestProps> = {
  testID: 'Navbar',
};

export const Navbar: React.FC<NavbarProps> = (props): JSX.Element => {
  const theme = useTheme();
  const { testID = navbarDefaults.testID } = props;

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen((prevState) => !prevState);
  };

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

      <HiColorSwatch
        data-testid={`${testID}_ThemeSwitcherIcon`}
        fill={theme.colors.main.effect.dark}
        onClick={handleClose}
        size={iconSizes.md}
      />

      {open && (
        <Modal onClose={handleClose}>
          <Typography
            style={{
              textAlign: 'center',
              color: theme.colors.background.default.lightest,
            }}
            variant="h4"
          >
            Choose a theme
          </Typography>

          <ThemeContext.Consumer>
            {({ switchTheme }) => {
              const createThemeSwitcherButton = (
                themeName: ThemeMode
              ): JSX.Element => {
                const handleSwitch = () => {
                  switchTheme(themeName);
                };
                return (
                  <Button key={themeName} onClick={handleSwitch}>
                    {themeName}
                  </Button>
                );
              };
              const buttons = availableThemeModes.map(
                createThemeSwitcherButton
              );

              return buttons;
            }}
          </ThemeContext.Consumer>
        </Modal>
      )}
    </NavbarContainer>
  );
};
