import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Grommet } from 'grommet';
import theme from 'theme';

import { AuthProvider } from 'containers/AuthProvider';
import Routes from './Routes';

function App() {
  return (
    <Grommet theme={theme} full themeMode="light">
      <Router>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </Router>
    </Grommet>
  );
}

export default App;
