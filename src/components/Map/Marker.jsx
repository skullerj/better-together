import React, { useRef } from 'react';
import { Drop, Box, Text } from 'grommet';
import { Location } from 'grommet-icons';

type MarkerProps = {
  lat: number;
  lng: number;
  $hover?: boolean;
  text?: string;
};

function Marker({ text = '', $hover }: MarkerProps) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <div style={{ position: 'absolute', top: -24, left: -24 }} ref={ref}>
        <Location color={$hover ? 'brand' : 'dark-1'} size="large" />
      </div>
      {ref.current && $hover && (
        <Drop align={{ bottom: 'top' }} target={ref.current} plain>
          <Box round background="background" pad="xsmall">
            <Text>{text}</Text>
          </Box>
        </Drop>
      )}
    </>
  );
}

export default React.memo(Marker);
