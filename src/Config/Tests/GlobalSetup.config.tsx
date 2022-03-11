/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { createElement, FC } from 'react';
import { create } from 'react-test-renderer';

import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import { CustomThemeProvider } from '../../Theme/CustomThemeProvider';

const renderJestDomCreator = <ComponentProps extends Record<string, any>>(
  componentReference: FC<ComponentProps>,
  props: ComponentProps
) =>
  render(createElement(componentReference, { ...props }), {
    wrapper: CustomThemeProvider,
  });

const renderRTRCreator = <ComponentProps extends Record<string, any>>(
  componentReference: FC<ComponentProps>,
  props: ComponentProps
) =>
  create(
    <CustomThemeProvider>
      {createElement(componentReference, { ...props })}
    </CustomThemeProvider>
  );

global.React = React;
export * from '@testing-library/react';
export { renderJestDomCreator, renderRTRCreator };
