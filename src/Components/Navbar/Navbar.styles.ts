import styled from 'styled-components';

import { ScreenBreakpoint, screenBreakpoints } from '../../Theme/Types';
import { Typography } from '../Typography';

export const heightByScreenSize: Record<
  Extract<ScreenBreakpoint, 'xs'> | 'others',
  string
> = {
  others: '5rem',
  xs: '8rem',
};

export const NavbarContainer = styled.div`
  padding: 0 2rem;
  height: ${heightByScreenSize.others};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  @media only screen and (max-width: ${screenBreakpoints.xs}px) {
    height: ${heightByScreenSize.xs};
  }
`;

export const Logo = styled(Typography)`
  text-transform: uppercase;
  justify-content: center;

  ${({ theme }) =>
    `background: linear-gradient(135deg,
     ${theme.colors.main.effect.dark},
     ${theme.colors.main.effect.light},
     ${theme.colors.main.detail.darker},
     ${theme.colors.main.detail.normal});`}
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  span.larger {
    font-size: 2.2rem;
  }

  @media only screen and (max-width: ${screenBreakpoints.xs}px) {
    display: flex;
    flex-direction: column;
    height: ${heightByScreenSize.xs};
  }
`;
