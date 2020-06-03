import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import {
  Heading,
  Text,
  Paragraph,
  Box,
  Button,
  TextInput,
  FormField
} from 'grommet';
import { format } from 'date-fns';

const validationSchema = object().shape({
  name: string()
    .required('Ingresa el nombre de quién recibe')
    .min('10', 'Mínimo 10 caracteres'),
  phone: string()
    .required('Ingresa el teléfono de quien recibe')
    .min(6, 'Debe tener 6 números')
});

function DonationEditor({ donation, updateDonation }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  async function handleReceive() {
    setLoading(true);
    try {
      await updateDonation(donation.id, { status: 'received' });
    } catch (e) {
      console.log(e);
      setError(e.message);
      setLoading(false);
    }
  }
  async function handleDeliver(values) {
    setLoading(true);
    try {
      await updateDonation(donation.id, {
        status: 'delivered',
        receivedBy: values.name,
        receivedPhone: values.phone
      });
    } catch (e) {
      console.log(e);
      setError(e.message);
      setLoading(false);
    }
  }
  if (donation.status === 'registered') {
    return (
      <Box>
        <Heading level="4" margin={{ bottom: 'small', top: '0' }}>
          Datos de la donación
        </Heading>
        <Text textAlign="start" size="small">
          {`Registrada el: ${format(donation.createdAt, 'dd-MM-yyyy')}`}
        </Text>
        <Text size="small">{`Se entrega en: ${donation.location.name}`}</Text>
        <Paragraph color="text-xweak">{donation.description}</Paragraph>
        <Heading level="4" margin={{ bottom: 'small', top: '0' }}>
          Datos del donante
        </Heading>
        <Text textAlign="start" size="small">
          {donation.donner}
        </Text>
        <Text textAlign="start" size="small">
          {donation.donnerEmail}
        </Text>
        {error && (
          <Text
            color="status-critical"
            margin={{ vertical: 'small' }}
            size="small"
          >
            Hubo un error. Por favor intenta más tarde
          </Text>
        )}
        <Button
          onClick={() => handleReceive()}
          label={!loading ? 'Marcar como recibida' : 'Cargando...'}
          margin={{ top: 'small' }}
          disabled={loading}
        />
      </Box>
    );
  } else {
    return (
      <Box>
        <Heading level="4" margin={{ bottom: 'small', top: '0' }}>
          Datos de la donación
        </Heading>
        <Text textAlign="start" size="small">
          {`Recibida el: ${format(donation.createdAt, 'dd-MM-yyyy')}`}
        </Text>
        <Text size="small">{`Se debe recibió en: ${donation.location.name}`}</Text>
        <Paragraph color="text-xweak">{donation.description}</Paragraph>
        <Heading level="4" margin={{ bottom: 'small', top: '0' }}>
          Datos del donante
        </Heading>
        <Text textAlign="start" size="small">
          {donation.donner}
        </Text>
        <Text textAlign="start" size="small">
          {donation.donnerEmail}
        </Text>
        <Formik
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={values => handleDeliver(values)}
          initialValues={{ name: '', phone: '' }}
        >
          {({ errors }) =>
            console.log(errors) || (
              <Form>
                <Box margin={{ vertical: 'medium' }}>
                  <Field name="name">
                    {({ field }: FieldProps) => (
                      <FormField
                        label="Nombre de quién recibe"
                        error={errors.name}
                      >
                        <TextInput {...field} />
                      </FormField>
                    )}
                  </Field>
                  <Field name="phone">
                    {({ field }: FieldProps) => (
                      <FormField
                        label="Teléfono de quién recibe"
                        error={errors.phone}
                      >
                        <TextInput {...field} />
                      </FormField>
                    )}
                  </Field>
                </Box>
                <Box>
                  {error && (
                    <Text
                      color="status-critical"
                      margin={{ vertical: 'small' }}
                      size="small"
                    >
                      Hubo un error. Por favor intenta más tarde
                    </Text>
                  )}
                  <Button
                    type="submit"
                    label={!loading ? 'Entregar' : 'Cargando...'}
                    margin={{ top: 'small' }}
                    disabled={loading}
                  />
                </Box>
              </Form>
            )
          }
        </Formik>
      </Box>
    );
  }
}

export default DonationEditor;
