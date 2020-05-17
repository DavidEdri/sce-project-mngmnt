import React from "react";
import { functions } from "@project/common";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Info from "./Info";
import Showcase from "./Showcase";
import Location from "./Location";
import Comments from "./Comments";
import Gallery from "./Gallery";

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
        <Showcase {...showcase} facilityID={facility._id} />
      </Grid>
      <Grid item md={6} xs={12}>
        <Info {...info} />
      </Grid>
      <Grid item md={6} xs={12}>
        <Location {...location} />
      </Grid>
      <Grid item md={6} xs={12}>
        {facility.gallery.length > 0 && <Gallery images={facility.gallery} />}
      </Grid>
      <Grid item xs={12}>
        <Comments
          facilityComments={facility.comments}
          facilityID={facility._id}
        />
      </Grid>
    </Grid>
  );
}

FacilityContainer.propTypes = {
  facility: PropTypes.object.isRequired,
};
