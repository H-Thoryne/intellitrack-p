import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const AssetOnMap = ({ location }) => {
  const [isOpen, toggle] = useState(false);
  return (
    <div className="map-marker-asset" id="position">
      <img
        className="map-marker-asset__image"
        src="https://www.hilti.hu/medias/sys_master/images/h5f/h96/9389244809246.jpg"
        alt="marker"
      />
      <Tooltip
        isOpen={isOpen}
        toggle={() => toggle(!isOpen)}
        placement="auto"
        target="position"
      >
        {location.user.name} {new Date(location.readAt).toLocaleDateString()}
      </Tooltip>
    </div>
  );
};

export default AssetOnMap;
