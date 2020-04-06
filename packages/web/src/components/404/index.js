import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";
// eslint-disable-next-line import/no-extraneous-dependencies
import { makeStyles } from "@material-ui/styles";
import Svg from "./svg";
import text from "../../utils/_text";

const useStyles = makeStyles(theme => ({
  btn: {
    display: "flex",
    justifyContent: "center"
  }
}));

export default function PageNotFound() {
  const classes = useStyles();

  return (
    <Grid container justify="center" align="center">
      <Grid item xs={12} sm={8}>
        <Svg />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" color="primary" gutterBottom align="center">
          {text._404main}
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.btn}>
        <Button variant="contained" color="primary" component={Link} to="/">
          {text._404sub}
        </Button>
      </Grid>
    </Grid>
  );
}
