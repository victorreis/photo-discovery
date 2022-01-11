import styled from 'styled-components';

import { CloseButtonStyleProps } from './CloseButton.types';

// The icon library does not pass the onClick to the SVG component, so I need to create thes transparent container.
export const TransparentContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const CloseButtonContainer = styled.button<CloseButtonStyleProps>`
  cursor: pointer;
  background-color: transparent;
  width: 2.5rem;
  height: 2.5rem;
  margin-top: -1.5rem;
  margin-right: -1.5rem;
  align-self: flex-end;
  border: 0;
  filter: drop-shadow(
      1px 1px 1px ${({ theme }) => theme.colors.main.effect.darker}
    )
    drop-shadow(-2px -2px 2px ${({ theme }) => theme.colors.main.effect.darker});
`;
