import React from 'react';

import SignIn from './pages/Signin';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';
import AppProvider from './hooks/index';

const App: React.FC = () => (
  <>
    <AppProvider>
      <SignIn />
    </AppProvider>

    <GlobalStyle />
  </>
);

export default App;
