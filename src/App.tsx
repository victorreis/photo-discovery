import { FC } from 'react';

import { Container } from './App.styles';
import { Navbar } from './Components/Navbar';
import { PhotoDiscovery } from './Pages/PhotoDiscovery/PhotoDiscovery';
import { CustomThemeProvider } from './Theme/CustomThemeProvider';

export const App: FC = (): JSX.Element => (
  <CustomThemeProvider>
    <Container data-testid="container">
      <Navbar />

      <PhotoDiscovery />
    </Container>
  </CustomThemeProvider>
);
