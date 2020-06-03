import React, { useRef } from 'react';
import { Drop, Box, Text } from 'grommet';
import { Location } from 'grommet-icons';

function Marker({ text = '', $hover, onClick }) {
  const ref = useRef(null);
  return (
    <>
      <div style={{ position: 'absolute', top: -24, left: -24 }} ref={ref}>
        <Location
          color={$hover ? 'brand' : 'dark-1'}
          size="large"
          onClick={onClick}
        />
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
