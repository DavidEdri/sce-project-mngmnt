import React from "react";
import { functions } from "@project/common";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Info from "./Info";
import Showcase from "./Showcase";
import Location from "./Location";

const { pick } = functions;

export default function FacilityContainer({ facility }) {
  const info = pick(facility, [
    "activity",
    "condition",
    "fencing",
    "handicappe",
    "ligthing",
    "neighborhood",
    "operator",
    "type",
  ]);
  const location = pick(facility, ["lat", "lon"]);
  const showcase = pick(facility, ["name", "rating"]);

  return (
    <Grid container spacing={3}>
      <Grid item md={6} xs={12}>
        <Showcase {...showcase} />
      </Grid>
      <Grid item md={6} xs={12}>
        <Info {...info} />
      </Grid>
      <Grid item md={6} xs={12}>
        <Location {...location} />
      </Grid>
    </Grid>
  );
}

FacilityContainer.propTypes = {
  facility: PropTypes.object.isRequired,
};
