import styled from 'styled-components';

import { toPx } from '../../Utils/Transform/toPx.util';
import { ButtonStyleProps } from './Button.types';

export const ButtonContainer = styled.button<ButtonStyleProps>`
  cursor: pointer;
  height: 3rem;
  margin: 0.5rem;
  border: 0;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  align-items: center;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.main.effect.normal}55;
  border-style: solid;
  padding: 1rem;

  ${({ theme }) => theme.typographies.button};
  background-color: ${({ theme }) => theme.colors.background.default.darkest};
  color: ${({ theme }) => theme.colors.background.default.lightest};
  border-radius: ${({ theme }) => toPx(theme.borders.radius.LG)};

  box-shadow: inset 0 0 1em ${({ theme }) => theme.colors.main.effect.normal}55;

  &:hover {
    box-shadow: inset 0 0 1em ${({ theme }) => theme.colors.main.effect.light},
      0 0 0.2em ${({ theme }) => theme.colors.main.effect.light};
    background-color: ${({ theme }) => theme.colors.background.default.normal};
  }
`;
