import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { useAuth } from 'containers/AuthProvider';
import { Favorite, List } from 'grommet-icons';
import styled from 'styled-components';
import { Box, Anchor } from 'grommet';
import AdminPage from 'pages/AdminPage';
import DonatePage from 'pages/DonatePage';
import MyDonationsPage from 'pages/MyDonationsPage';

const Main = styled(Box)`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
`;

const Content = styled(Box)`
  width: 100%;
  padding-bottom: 60px;
`;

const NavBar = styled(Box)`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 60px;
`;

function UserRoutes() {
  return (
    <Main>
      <Content background="background-back" flex="grow">
        <Route path="/" exact>
          <DonatePage />
        </Route>
        <Route path="/mis-donaciones">
          <MyDonationsPage />
        </Route>
        <NavBar background="dark-1" pad="small" tag="nav">
          <Box direction="row">
            <Anchor
              label="Donar"
              as={({ className, children }) => (
                <Box flex="grow">
                  <Link to="/" className={className}>
                    <Box align="center">
                      <Favorite size="medium" color="brand" />
                      {children}
                    </Box>
                  </Link>
                </Box>
              )}
            />
            <Anchor
              label="Mis donaciones"
              as={({ className, children }) => (
                <Box flex="grow">
                  <Link to="/mis-donaciones" className={className}>
                    <Box align="center">
                      <List size="medium" color="brand" />
                      {children}
                    </Box>
                  </Link>
                </Box>
              )}
            />
          </Box>
        </NavBar>
      </Content>
    </Main>
  );
}

function AdminRoutes() {
  return (
    <Main>
      <Content>
        <Route path="/" exact>
          <AdminPage />
        </Route>
        <NavBar background="dark-1" pad="small" tag="nav">
          <Box direction="row">
            <Anchor
              label="Administrar"
              as={({ className, children }) => (
                <Box flex="grow">
                  <Link to="/" className={className}>
                    <Box align="center">
                      <List size="medium" color="brand" />
                      {children}
                    </Box>
                  </Link>
                </Box>
              )}
            />
          </Box>
        </NavBar>
      </Content>
    </Main>
  );
}

function Routes() {
  const { role } = useAuth();
  console.log(role);
  return (
    <Switch>
      {role === 'admin' && <AdminRoutes />}
      {role === 'user' && <UserRoutes />}
    </Switch>
  );
}

export default Routes;
