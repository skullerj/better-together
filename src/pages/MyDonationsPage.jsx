import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Text, Paragraph, Button } from 'grommet';
import Loading from 'components/Loading';
import { useAuth } from 'containers/AuthProvider';
import { getMyDonations } from 'api/donation';
import { format } from 'date-fns';

export default function MyDonationsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function loadDonations() {
      try {
        const donations = await getMyDonations(user.uid);
        console.log(donations);
        setDonations(donations);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadDonations();
  }, [user.uid]);

  return (
    <Box flex="grow" overflow="auto" pad="medium">
      {loading && (
        <Box align="center" margin={{ top: 'medium' }}>
          <Loading />
        </Box>
      )}
      {!loading && (
        <Box>
          <Heading level="3" margin={{ vertical: 'small' }} textAlign="center">
            Mis Donaciones
          </Heading>
          {donations.length === 0 && (
            <Text color="text-xweak" margin={{ top: 'medium' }}>
              No has realizado ninguna donación todavía
            </Text>
          )}
          {donations.map(d => (
            <Box
              key={d.id}
              margin={{ top: 'medium' }}
              elevation="small"
              pad="medium"
              background="background-front"
            >
              <Text size="xsmall" textAlign="end">
                {format(d.createdAt, 'dd-MM-yyyy')}
              </Text>
              <Heading level="4" margin={{ bottom: 'small', top: '0' }}>
                {d.location.name}
              </Heading>
              <Paragraph color="text-xweak">{d.description}</Paragraph>
              {d.status === 'registered' && (
                <Text size="small" color="text-xweak">
                  Esta donación está registrada. Por favor acércate al centro de
                  acopio a entregar los productos
                </Text>
              )}
              {d.status === 'received' && (
                <Text size="small" color="status-warning">
                  Hemos recibido tu donación. En pronto actualizaremos los datos
                  del beneficiario.
                </Text>
              )}
              {d.status === 'delivered' && (
                <Text size="small" color="status-ok">
                  {`Hemos entregado esta donación a ${d.receivedBy}. Puedes contactarl@ al ${d.receivedPhone}. Gracias por ayudar!`}
                </Text>
              )}
            </Box>
          ))}
        </Box>
      )}
      {!loading && error && (
        <Box>
          <Heading level="3" margin={{ vertical: 'small' }} textAlign="center">
            Mis Donaciones
          </Heading>
          <Box
            margin={{ top: 'medium' }}
            elevation="small"
            pad="medium"
            background="background-front"
          >
            <Text color="status-critical" margin={{ bottom: 'medium' }}>
              Hubo un error. Por favor intenta más tarde
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
}
