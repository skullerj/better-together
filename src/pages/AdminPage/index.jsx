import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Text, Paragraph, Button } from 'grommet';
import Loading from 'components/Loading';
import { useAuth } from 'containers/AuthProvider';
import { createDonation } from 'api/donation';
import { useDonatePage } from './reducer';
// import DonateForm from './DonateForm';

export default function DonatePage() {
  const {
    locations,
    status,
    donationRegistered,
    setError,
    goBack
  } = useDonatePage();
  const { user } = useAuth();
  async function registerDonation(values) {
    try {
      await createDonation(values, user);
      donationRegistered();
    } catch (e) {
      console.log(e);
      setError(e);
    }
  }

  return (
    <Box flex="grow" overflow="auto" pad="medium">
      {status === 'loading' && (
        <Box align="center" margin={{ top: 'medium' }}>
          <Loading />
        </Box>
      )}
      {status === 'idle' && (
        <Box>
          <Heading level="3" margin={{ vertical: 'small' }} textAlign="center">
            Registra tu donación
          </Heading>
          <Box
            margin={{ top: 'medium' }}
            elevation="small"
            pad="medium"
            background="background-front"
          >
            {/* <DonateForm
              locations={locations}
              onSubmit={values => registerDonation(values)}
            /> */}
          </Box>
        </Box>
      )}
      {status === 'donation-registered' && (
        <Box>
          <Heading level="3" margin={{ vertical: 'small' }} textAlign="center">
            Registra tu donación
          </Heading>
          <Box
            margin={{ top: 'medium' }}
            elevation="small"
            pad="medium"
            background="background-front"
          >
            <Heading color="status-ok" leve="3">
              ¡Gracias!
            </Heading>
            <Paragraph>
              Hemos registrado tu donación. Por favor acércate al centro de
              acopio que seleccionaste para completarla.
            </Paragraph>
            <Link to="/mis-donaciones">
              <Button label="Ver mis donaciones" />
            </Link>
          </Box>
        </Box>
      )}
      {status === 'error' && (
        <Box>
          <Heading level="3" margin={{ vertical: 'small' }} textAlign="center">
            Registra tu donación
          </Heading>
          <Box
            margin={{ top: 'medium' }}
            elevation="small"
            pad="medium"
            background="background-front"
          >
            <Text color="status-critical" margin={{ bottom: 'medium'}}>
              Hubo un error. Por favor intenta más tarde
            </Text>
            <Button label="Regresar" onClick={() => goBack()} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
