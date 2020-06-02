import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grommet } from 'grommet';

import { AuthProvider } from 'containers/AuthProvider';

const theme = {
  global: {
    colors: {
      brand: {
        dark: '#fd9c4d',
        light: '#fd9c4d'
      },
      background: {
        dark: '#1f1f1f',
        light: '#FFFFFF'
      },
      'background-back': {
        dark: '#1f1f1f',
        light: '#EEEEEE'
      },
      'background-front': {
        dark: '#222222',
        light: '#FFFFFF'
      },
      'background-contrast': {
        dark: '#FFFFFF11',
        light: '#1f1f1f11'
      },
      text: {
        dark: '#EEEEEE',
        light: '#333333'
      },
      'text-strong': {
        dark: '#FFFFFF',
        light: '#000000'
      },
      'text-weak': {
        dark: '#CCCCCC',
        light: '#444444'
      },
      'text-xweak': {
        dark: '#999999',
        light: '#666666'
      },
      border: {
        dark: '#444444',
        light: '#CCCCCC'
      },
      control: 'brand',
      'active-background': 'background-contrast',
      'active-text': 'text-strong',
      'selected-background': 'brand',
      'selected-text': 'text-strong',
      'status-critical': '#F40000',
      'status-warning': '#FFAA15',
      'status-ok': '#7CB518',
      'status-unknown': '#CCCCCC',
      'status-disabled': '#CCCCCC',
      'graph-0': 'brand',
      'graph-1': 'status-warning',
      'accent-1': 'brand',
      focus: 'brand',
      facebook: '#3B5998'
    },
    font: {
      family: '"Open Sans"',
      size: '18px',
      height: '24px',
      maxWidth: '432px'
    },
    active: {
      background: {
        color: 'active-background'
      },
      color: 'active-text'
    },
    hover: {
      background: 'active-background',
      color: 'active-text'
    },
    selected: {
      background: 'selected-background',
      color: 'selected-text'
    },
    control: {
      border: {
        radius: '8px'
      }
    },
  },
}

function App() {
  return (
    <Grommet theme={theme} full themeMode="light">
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/">
              <h1>User is authenticated</h1>
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </Grommet>
  );
}

export default App;
