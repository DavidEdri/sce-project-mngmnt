import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { useFetch } from "../../utils/hooks";
import Loading from "../common/Loading";

export default function FacilityList() {
  const { loading, data } = useFetch("/guests/facility");

  if (loading) return <Loading />;

  return (
    <Grid container>
      {data.map((f) => (
        <Grid item md={3} xs={6} key={f._id}>
          <Link to={`/facility/${f._id}`}>{f.name}</Link>
        </Grid>
      ))}
    </Grid>
  );
}
