import React, { useState } from 'react';
import { useAuth } from 'containers/AuthProvider';
import { Facebook } from 'grommet-icons';
import { Main, Box, Button, Text, Image } from 'grommet';
import logo from 'images/logo.png';

export default function LoginPage() {
  const { loginWithFacebook } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  async function handleFacebookLogin() {
    try {
      setLoading(true);
      await loginWithFacebook();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Main background="brand" pad="small">
      <Box fill align="center" justify="center">
        <Box height="medium" round overflow="hidden">
          <Image src={logo} fit="contain" />
        </Box>
        <Button
          icon={<Facebook />}
          color="facebook"
          primary
          label="Ingresar con Facebook"
          disabled={loading}
          onClick={handleFacebookLogin}
        />
        {error && (
          <Text color="status-error" margin={{ top: 'small' }}>
            {error}
          </Text>
        )}
      </Box>
    </Main>
  );
}
