import React from 'react';

const MapMarkerCircle = ({ width, height }) => {
  return (
    <div
      className="map-marker-circle"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        right: `${width / 2}px`,
        bottom: `${height / 2}px`
      }}
    />
  );
};

export default MapMarkerCircle;
