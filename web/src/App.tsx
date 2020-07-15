import React from 'react';

import GlobalStyle from './styles/global';
import AppProvider from './hooks/index';

import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Routes />
    </AppProvider>

    <GlobalStyle />
  </Router>
);

export default App;
