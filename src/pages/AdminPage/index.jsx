import React from 'react';
import { Box, Heading, Text, Paragraph, Button } from 'grommet';
import Loading from 'components/Loading';
import { useAdminPage } from './reducer';
import { format } from 'date-fns';
import DonationEditor from './DonationEditor';

export default function DonatePage() {
  const {
    donations,
    status,
    selectedDonation,
    selectDonation,
    update,
    goBack
  } = useAdminPage();
  return (
    <Box flex="grow" overflow="auto" pad="medium">
      {status === 'loading' && (
        <Box align="center" margin={{ top: 'medium' }}>
          <Loading />
        </Box>
      )}
      {(status === 'idle' || status === 'donation-updated') && (
        <Box>
          <Heading level="3" margin={{ vertical: 'small' }} textAlign="center">
            Administrar donaciones
          </Heading>
          {status === 'donation-updated' && (
            <Text color="status-ok">Donación Actualizada con éxito!</Text>
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
              <Text>{d.donner}</Text>
              <Paragraph color="text-xweak">{d.description}</Paragraph>
              {d.status === 'registered' && (
                <>
                  <Text>
                    Status: <strong>Por recibir</strong>
                  </Text>
                  <Button
                    margin={{ top: 'small' }}
                    label="Recibir Donación"
                    onClick={() => selectDonation(d)}
                  />
                </>
              )}
              {d.status === 'received' && (
                <>
                  <Text>
                    Status: <strong>Por entregar</strong>
                  </Text>
                  <Button
                    margin={{ top: 'small' }}
                    label="Entregar Donación"
                    onClick={() => selectDonation(d)}
                  />
                </>
              )}
            </Box>
          ))}
        </Box>
      )}
      {status === 'editing-donation' && (
        <Box>
          <Heading level="3" margin={{ vertical: 'small' }} textAlign="center">
            Donación
          </Heading>
          <Box
            margin={{ top: 'medium' }}
            elevation="small"
            pad="medium"
            background="background-front"
          >
            <DonationEditor
              donation={selectedDonation}
              updateDonation={update}
            />
          </Box>
        </Box>
      )}
      {status === 'error' && (
        <Box>
          <Heading level="3" margin={{ vertical: 'small' }} textAlign="center">
            Administrar Donaciones
          </Heading>
          <Box
            margin={{ top: 'medium' }}
            elevation="small"
            pad="medium"
            background="background-front"
          >
            <Text
              color="status-critical"
              margin={{ bottom: 'medium' }}
              size="small"
            >
              Hubo un error. Por favor intenta más tarde
            </Text>
            <Button label="Regresar" onClick={() => goBack()} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
