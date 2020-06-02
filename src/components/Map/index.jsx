import React, { useRef } from 'react';
import styled from 'styled-components';
import { Box, TextInput, BoxProps } from 'grommet';
import { Location } from 'grommet-icons';
import GoogleMapReact, { Coords, ChangeEventValue } from 'google-map-react';
import Marker from './Marker';

function getMapsApiKey() {
  if (process.env.REACT_APP_MAPS_API_KEY) {
    return process.env.REACT_APP_MAPS_API_KEY;
  } else {
    throw new Error('Google maps Api key not configured');
  }
}

type MapProps = {
  showCenter?: boolean;
  defaultCenter?: Coords;
  defaultZoom?: number;
  onChange?: (change: ChangeEventValue) => void;
  heigth: BoxProps['height'];
  width: BoxProps['width'];
  markers?: { lat: number; lng: number; key: string; text?: string }[];
  hideSearch?: boolean;
};

let SearchBox: any;

const Wrapper = styled(Box)`
  position: relative;
`;

const CenterWrapper = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const SearchWrapper = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

function Map({
  showCenter = false,
  defaultCenter = { lat: 0.1807, lng: -78.4678 },
  defaultZoom = 10,
  onChange = () => {},
  heigth,
  width,
  markers = [],
  hideSearch = false
}: MapProps) {
  const inputRef = useRef(null);
  function handleApiLoaded(map: any, maps: any) {
    // Set up the TextInput as a google maps SearchBox
    if (inputRef.current) {
      SearchBox = new maps.places.SearchBox(inputRef.current);
      // Whenever the user selects a place, the map will reflect the change
      SearchBox.addListener('places_changed', () => {
        const newplace = SearchBox.getPlaces()[0];
        if (newplace) {
          map.setCenter(newplace.geometry.location);
        }
      });
    }
    // Always bias SearchBox results to the map bounds
    map.addListener('bounds_changed', () => {
      if (SearchBox) {
        SearchBox.setBounds(map.getBounds());
      }
    });
  }
  return (
    <Wrapper height={heigth} width={width}>
      {!hideSearch && (
        <SearchWrapper fill="horizontal" background="transparent">
          <Box background="background" round="8px" margin="small">
            <TextInput ref={inputRef} placeholder="Busca un lugar..." />
          </Box>
        </SearchWrapper>
      )}
      <Box fill>
        <GoogleMapReact
          defaultCenter={defaultCenter}
          options={(maps: any) => ({
            fullscreenControl: false,
            zoomControlOptions: {
              position: maps.ControlPosition.LEFT_CENTER
            }
          })}
          defaultZoom={defaultZoom}
          bootstrapURLKeys={{ key: getMapsApiKey(), libraries: 'places' }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          onChange={onChange}
          hoverDistance={24}
        >
          {markers.map(mark => (
            <Marker
              lat={mark.lat}
              lng={mark.lng}
              key={mark.key}
              text={mark.text}
            />
          ))}
        </GoogleMapReact>
      </Box>
      {showCenter && (
        <CenterWrapper>
          <Location color="dark-1" size="large" />
        </CenterWrapper>
      )}
    </Wrapper>
  );
}

export default Map;
