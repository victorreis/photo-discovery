import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background.default.darkest};
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;

export const PageContainer = styled.div`
  padding: 0 2rem;
  margin-bottom: 5rem;
  overflow-x: hidden;
  overflow-y: hidden;
`;
