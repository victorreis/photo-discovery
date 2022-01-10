import styled from 'styled-components';

import { TypographyStyleProps } from './Typography.types';

export const TypographyContainer = styled.span<TypographyStyleProps>`
  color: ${({ theme }) => theme.colors.font.default};
  ${({ variant, theme }) => theme.typographies[variant]};
`;
