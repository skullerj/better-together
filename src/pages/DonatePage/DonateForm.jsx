import React, { useState } from 'react';
import { Box, Text, FormField, TextArea, Button } from 'grommet';
import Map from 'components/Map';
import { object, string } from 'yup';
import { Formik, Form, Field, FieldProps } from 'formik';

const ValidationSchema = object().shape({
  description: string()
    .required('Ingresa lo que vas a donar')
    .min(5, 'Debe tener al menos 5 caracteres.'),
  location: object().required('Debes seleccionar un centro de acopio')
});

function DonateForm({ locations, onSubmit, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [submitError, setError] = useState(null);
  async function handleSubmit(values) {
    setLoading(true);
    try {
      await onSubmit(values);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={ValidationSchema}
      initialValues={{ description: '', location: null }}
    >
      {({ errors, values }) => (
        <Form>
          <Box alignSelf="center">
            <Field name="description">
              {({ field }: FieldProps) => (
                <FormField label="¿Qué vas a donar?" error={errors.description}>
                  <TextArea
                    {...field}
                    rows="10"
                    placeholder="Una libra de arroz, dos cartones de leche, etc.."
                  />
                </FormField>
              )}
            </Field>
            {values.location && (
              <Text margin={{ vertical: 'small' }} color="status-ok">
                {`Has seleccionado: ${values.location.name}`}
              </Text>
            )}
            {!values.location && (
              <Text
                size="small"
                margin={{ vertical: 'small' }}
                color="text-xweak"
              >
                Utiliza el mapa para seleccionar el centro de acopio al que
                quieres acercarte
              </Text>
            )}

            <Field name="location">
              {({ field, form, meta }) => (
                <Map
                  markers={locations.map(l => ({
                    lat: l.position.lat,
                    lng: l.position.lng,
                    key: l.name,
                    text: l.name,
                    location: l
                  }))}
                  heigth="medium"
                  width="100%"
                  defaultZoom={14}
                  defaultCenter={{
                    lat: -0.162626,
                    lng: -78.471591
                  }}
                  onMarkerClick={marker =>
                    form.setFieldValue(field.name, marker.location)
                  }
                />
              )}
            </Field>
            {errors.location && (
              <Text color="status-critical">
                Selecciona un centro de acopio
              </Text>
            )}
            {submitError && (
              <Text color="status-critical">
                Hubo un error registrando tu donaci´ón, por favor intenta más
                tarde
              </Text>
            )}
            <Box direction="row" margin={{ top: 'medium' }} justify="end">
              <Button
                margin={{ left: 'small' }}
                type="submit"
                primary
                label={loading ? 'Cargando ...' : 'Registrar'}
              />
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default DonateForm;
