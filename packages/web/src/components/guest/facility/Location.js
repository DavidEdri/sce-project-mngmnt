import React from "react";
import PropTypes from "prop-types";

export default function Location({ lon, lat }) {
  return (
    <div>
      <iframe
        title="map"
        src={`http://maps.google.com/maps?z=12&t=m&q=loc:${lat},${lon}&output=embed`}
        height="300"
        frameBorder="0"
        allowFullScreen=""
      />
    </div>
  );
}

Location.propTypes = {
  lon: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
};
