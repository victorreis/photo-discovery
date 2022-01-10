import React from 'react';

import { Container } from './App.styles';
import { Navbar } from './Components/Navbar';
import { Typography } from './Components/Typography';
import { CustomThemeProvider } from './Theme/CustomThemeProvider';

export const App: React.FC = (): JSX.Element => {
  return (
    <CustomThemeProvider>
      <Container data-testid="container">
        <Navbar />

        <Typography>hello world</Typography>
      </Container>
    </CustomThemeProvider>
  );
};
