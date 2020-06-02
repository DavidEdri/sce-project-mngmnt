import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { Waypoint } from "react-waypoint";
import FacilityCard from "./FacilityCard";

export default function FacilityList({ facilities }) {
  const [infiniteData, setInfiniteData] = useState({
    elements: facilities.slice(0, 10),
    lastIndex: 10,
  });

  const handleInfinte = () => {
    const newIndex = infiniteData.lastIndex + 10;
    setInfiniteData({
      elements: facilities.slice(0, newIndex),
      lastIndex: newIndex,
    });
  };

  useEffect(() => {
    setInfiniteData({
      elements: facilities.slice(0, 10),
      lastIndex: 10,
    });
  }, [facilities]);

  return (
    <Grid container>
      {infiniteData.elements.map((f, i) => (
        <Grid item xs={12} key={f._id}>
          {i === infiniteData.elements.length - 3 && (
            <Waypoint onEnter={handleInfinte} />
          )}
          <FacilityCard facility={f} />
        </Grid>
      ))}
    </Grid>
  );
}

FacilityList.propTypes = {
  facilities: PropTypes.array.isRequired,
};
