import styled from 'styled-components';

import { toPx } from '../../Utils/Transform/toPx.util';
import { Typography } from '../Typography';
import { ImageCardStyleProps } from './ImageCard.types';

export const ImageCardContainer = styled.div<ImageCardStyleProps>`
  background-color: ${({ theme }) => theme.colors.background.default.normal};
  width: 10rem;
  border-radius: ${({ theme }) => toPx(theme.borders.radius.LG)};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 0.25em ${({ theme }) => theme.colors.main.effect.normal};

  &:hover {
    box-shadow: 0 0 0.75em ${({ theme }) => theme.colors.main.effect.normal};
  }
`;

export const Thumbnail = styled.img`
  width: 10rem;
  height: 10rem;
  box-sizing: border-box;
  border-top-left-radius: ${({ theme }) => toPx(theme.borders.radius.LG)};
  border-top-right-radius: ${({ theme }) => toPx(theme.borders.radius.LG)};
  cursor: pointer;
`;

export const CardTitle = styled(Typography)`
  padding: 0.5rem;
`;

export const ModalTitle = styled(Typography)`
  margin-block-end: 0;
`;
