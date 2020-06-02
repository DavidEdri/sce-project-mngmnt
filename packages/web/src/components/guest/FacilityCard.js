import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Box, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FacilityBools } from "./facility/Info";

const useStyles = makeStyles((theme) => ({
  name: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 200,
    fontSize: 38,
  },
}));

export default function FacilityCard({ facility }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Box
          className={classes.name}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {facility.name}
        </Box>
        <Typography align="center">{`Neighborhood: ${facility.neighborhood}`}</Typography>
        <FacilityBools
          fencing={facility.fencing}
          ligthing={facility.ligthing}
          handicappe={facility.handicappe}
        />
      </CardContent>
      <CardActions>
        <Link to={`/facility/${facility._id}`}>
          <Button size="small">Show More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

FacilityCard.propTypes = {
  facility: PropTypes.object.isRequired,
};
