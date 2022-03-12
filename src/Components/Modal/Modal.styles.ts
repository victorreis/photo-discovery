import styled from 'styled-components';

import { screenBreakpointRanges, screenBreakpoints } from '../../Theme/Types';
import { toPx } from '../../Utils/Transform/toPx.util';

export const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
`;

export const ModalBackdropContainer = styled.div`
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.common.black}bb;
  z-index: 1;
`;

export const ModalContentContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.default.darker};
  border: 0;
  padding: 2rem;
  border-radius: ${({ theme }) => toPx(theme.borders.radius.XL)};
  display: flex;
  flex-direction: column;
  z-index: 10;
  box-sizing: border-box;
  position: fixed;

  @media only screen and (max-width: ${screenBreakpoints.sm}px) {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  @media ${screenBreakpointRanges.md} {
    width: 50vw;
  }

  @media ${screenBreakpointRanges.lg} {
    width: 40vw;
  }
  @media ${screenBreakpointRanges.xl} {
    width: 30vw;
  }
`;
