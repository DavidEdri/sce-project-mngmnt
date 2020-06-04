import React from "react";
import { useSelector } from "react-redux";
import { functions } from "@project/common";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Info from "./Info";
import Showcase from "./Showcase";
import Location from "./Location";
import Comments from "./Comments";
import Gallery from "./Gallery";
import SendMessage from "./SendMessage";
import Report from "./Report";

const { pick } = functions;

export default function FacilityContainer({ facility }) {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
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
      {isLoggedin && (
        <Grid item xs={12}>
          <SendMessage managerID={facility.manager} />
        </Grid>
      )}
      <Report facilityID={facility._id} />
    </Grid>
  );
}

FacilityContainer.propTypes = {
  facility: PropTypes.object.isRequired,
};
