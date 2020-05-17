import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import HeaderCard from "../../common/HeaderCard";
import Rating from "./Rating";
import Favorite from "./Favorite";

const useStyles = makeStyles((theme) => ({
  name: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 200,
    fontSize: 38,
  },
}));

export default function Showcase({ name, rating, facilityID }) {
  const classes = useStyles();
  return (
    <HeaderCard
      header={name}
      content={
        <Box>
          <Box
            className={classes.name}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {name}
            {/* <img
              style={{ height: "100%", width: "100%" }}
              src="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
              alt=""
            /> */}
          </Box>
          <Rating facilityID={facilityID} rating={rating} />
          <Favorite facilityID={facilityID} />
        </Box>
      }
    />
  );
}

Showcase.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.object.isRequired,
  facilityID: PropTypes.string.isRequired,
};
