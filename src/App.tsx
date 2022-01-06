import React from 'react';

import logo from './logo.svg';
import './App.css';

export const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <header className="App-header">
        <img alt="logo" className="App-logo" src={logo} />

        <p>
          Edit // eslint-disable-next-line react/jsx-child-element-spacing
          src/App.tsx and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          rel="noopener noreferrer"
          target="_blank"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};
