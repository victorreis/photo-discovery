import styled from 'styled-components';

import { toPx } from '../../Utils/Transform/toPx.util';

export const Input = styled.input`
  height: 3rem;
  margin: 0.5rem;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.main.effect.normal}55;
  border-style: solid;
  ${({ theme }) => theme.typographies.body1};
  background-color: ${({ theme }) => theme.colors.background.default.lightest};
  border-radius: ${({ theme }) => toPx(theme.borders.radius.LG)};
  box-sizing: border-box;
  padding: 0.5rem;
`;
