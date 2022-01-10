import React from 'react';

import { Container } from './App.styles';
import { Typography } from './Components/Typography';
import { CustomThemeProvider } from './Theme/CustomThemeProvider';

export const App: React.FC = (): JSX.Element => {
  return (
    <CustomThemeProvider>
      <Container data-testid="container">
        <Typography>hello world</Typography>
      </Container>
    </CustomThemeProvider>
  );
};
