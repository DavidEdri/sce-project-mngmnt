import React from "react";
import PropTypes from "prop-types";

export default function Location({ lon, lat }) {
  return (
    <div>
      {lon}
      {lat}
    </div>
  );
}

Location.propTypes = {
  lon: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
};
