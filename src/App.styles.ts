import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background.default.darkest};
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
