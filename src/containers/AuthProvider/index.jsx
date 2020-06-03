import React, { useMemo } from 'react';
import produce from 'immer';
import { useHistory } from 'react-router-dom';
import {
  listenStateChanges,
  logout,
  loginWithFacebook,
  getUserProfile
} from 'api/auth';
import LoginPage from 'pages/LoginPage';
import Loading from 'components/Loading';

const initialState = {
  authenticated: false,
  user: {},
  loading: true,
  role: null
};

const AuthContext = React.createContext([initialState, () => {}]);

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside a AuthProvider');
  }
  const [authState] = context;
  const { authenticated, user, role } = authState;
  const history = useHistory();
  const value = useMemo(
    () => ({
      authenticated,
      user,
      role,
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
    [authenticated, history, role, user]
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
          produce(auth => {
            auth.authenticated = false;
            auth.loading = false;
          })
        );
      } else {
        // User is logged in
        getUserProfile(user.uid).then(profile => {
          console.log(profile);
          setAuthState(
            produce(auth => {
              auth.authenticated = true;
              auth.loading = false;
              auth.user = user;
              auth.role = profile.role;
            })
          );
        });
      }
    });
  }, []);
  const value = React.useMemo(() => [authState, setAuthState], [authState]);
  return (
    <AuthContext.Provider value={value} {...props}>
      {authState.loading && <Loading />}
      {!authState.loading && authState.authenticated && props.children}
      {!authState.loading && !authState.authenticated && <LoginPage />}
    </AuthContext.Provider>
  );
}
