/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { create } from 'react-test-renderer';

import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import { CustomThemeProvider } from '../../Theme/CustomThemeProvider';

const renderJestDomCreator = <ComponentProps extends Record<string, any>>(
  componentReference: React.FC<ComponentProps>,
  props: ComponentProps
) =>
  render(React.createElement(componentReference, { ...props }), {
    wrapper: CustomThemeProvider,
  });

const renderRTRCreator = <ComponentProps extends Record<string, any>>(
  componentReference: React.FC<ComponentProps>,
  props: ComponentProps
) =>
  create(
    <CustomThemeProvider>
      {React.createElement(componentReference, { ...props })}
    </CustomThemeProvider>
  );

global.React = React;
export * from '@testing-library/react';
export { renderJestDomCreator, renderRTRCreator };
