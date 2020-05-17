import React from "react";
import { useSelector } from "react-redux";
import { Typography, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Home() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      <Typography align="center" variant="h2" color="primary" gutterBottom>
        {`Hello ${user.name}`}
      </Typography>
      <Typography align="center" variant="h4" color="primary">
        Favorite facilities :
      </Typography>

      <Grid container>
        {user.favorites.map((f) => (
          <Grid item md={3} xs={6} key={f}>
            <Link to={`/facility/${f}`}>{f}</Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
