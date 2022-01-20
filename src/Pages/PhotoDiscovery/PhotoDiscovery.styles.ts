import styled from 'styled-components';

import { Typography } from '../../Components/Typography';
import { screenBreakpointRanges, screenBreakpoints } from '../../Theme/Types';

const intermediateBreakpoint =
  screenBreakpoints.sm + (screenBreakpoints.md - screenBreakpoints.sm) / 2;

export const PhotoDiscoveryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 11rem);
  transition: all 1s;
  /* column-gap: 0rem; */
  row-gap: 1rem;
  justify-content: center;

  @media only screen and (max-width: ${screenBreakpoints.sm}px) {
    grid-template-columns: repeat(1, 11rem);
  }

  @media only screen and (min-width: ${screenBreakpoints.sm}px) and (max-width: ${intermediateBreakpoint}px) {
    grid-template-columns: repeat(2, 11rem);
  }

  @media only screen and (min-width: ${intermediateBreakpoint}px) and (max-width: ${screenBreakpoints.md}px) {
    grid-template-columns: repeat(3, 11rem);
  }

  @media ${screenBreakpointRanges.lg} {
    grid-template-columns: repeat(4, 11rem);
  }

  @media ${screenBreakpointRanges.xl} {
    grid-template-columns: repeat(5, 11rem);
  }
`;

export const SearchContainer = styled.div`
  display: grid;
  transition: all 1s;

  @media only screen and (max-width: ${screenBreakpoints.sm}px) {
    grid-template-columns: 14rem;
  }

  @media only screen and (min-width: ${screenBreakpoints.sm}px) and (max-width: ${intermediateBreakpoint}px) {
    grid-template-columns: 12rem 12rem;

    input {
      grid-column: 1 / 3;
      grid-row: 1 / 2;
    }

    button {
      grid-column: 1 / 3;
      grid-row: 3 / 4;
    }
  }

  @media only screen and (min-width: ${intermediateBreakpoint}px) and (max-width: ${screenBreakpoints.md}px) {
    grid-template-columns: 14rem 14rem;

    input {
      grid-column: 1 / 3;
      grid-row: 1 / 2;
    }

    button {
      grid-column: 1 / 3;
      grid-row: 3 / 4;
    }
  }

  @media ${screenBreakpointRanges.lg} {
    grid-template-columns: 14rem 11rem 11rem 8rem;
  }

  @media ${screenBreakpointRanges.xl} {
    grid-template-columns: 16rem 12rem 12rem 10rem;
  }
`;

export const FeedbackMessage = styled(Typography)`
  margin-top: 3rem;
`;
