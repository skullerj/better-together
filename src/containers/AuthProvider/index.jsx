import React, { useMemo } from 'react';
import produce from 'immer';
import { useHistory } from 'react-router-dom';
import { listenStateChanges, logout, loginWithFacebook } from 'api/auth';
import LoginPage from 'pages/LoginPage';
import Loading from 'components/Loading';

const initialState = {
  authenticated: false,
  user: {},
  loading: true
};

const AuthContext = React.createContext([initialState, () => {}]);

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside a AuthProvider');
  }
  const [authState] = context;
  const { authenticated, user } = authState;
  const history = useHistory();
  const value = useMemo(
    () => ({
      authenticated,
      user,
      loginWithFacebook: async (redirectAfter = false) => {
        await loginWithFacebook();
        if (redirectAfter) {
          history.replace('/account');
        }
      },
      logout: async () => {
        await logout();
        history.replace('/');
      }
    }),
    [authenticated, history, user]
  );
  return value;
}

export function AuthProvider(props) {
  const [authState, setAuthState] = React.useState(initialState);
  React.useEffect(() => {
    // Listen to firebase auth state changes
    // i.e. when user logs in
    listenStateChanges(user => {
      if (!user) {
        // User logs out
        setAuthState(
          produce((auth: AuthState) => {
            auth.authenticated = false;
          })
        );
      } else {
        // User is logged in
        setAuthState(
          produce((auth: AuthState) => {
            auth.authenticated = true;
            auth.user = user;
          })
        );
      }
    });
  }, []);
  const value = React.useMemo(() => [authState, setAuthState], [authState]);
  return (
    <AuthContext.Provider value={value} {...props}>
      {value.loading && <Loading />}
      {!value.loading && value.authenticated && props.children}
      {!value.loading && !value.authenticated && <LoginPage />}
    </AuthContext.Provider>
  );
}
