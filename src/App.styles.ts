import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background.default.darkest};
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.background.default.normal};
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.default.light};
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.background.default.darker}cc;
  }
  &::-webkit-scrollbar-track:hover {
    background: ${({ theme }) => theme.colors.background.default.light}cc;
  }
`;

export const PageContainer = styled.div`
  padding: 0 2rem;
  margin-bottom: 5rem;
  overflow-x: hidden;
  overflow-y: hidden;
`;
