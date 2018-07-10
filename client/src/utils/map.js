import React from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { googleMapAPIKey } from 'utils/util';

const Map = ({center, markers, zoom}) =>
    <GoogleMap zoom={zoom} center={center}>
        {markers.map((m, i) =>
            <Marker key={`marker${i}`} position={m} />
        )}
    </GoogleMap>

export default compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${googleMapAPIKey}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '255px' }} />,
        mapElement: <div style={{ height: '100%' }} />
    }),
    withScriptjs,
    withGoogleMap
)(Map);