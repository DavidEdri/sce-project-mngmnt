import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useFetch } from "../../utils/hooks";
import Loading from "../common/Loading";
import FacilityList from "./FacilityList";
import Searchbar from "./Searchbar";

export default function Home() {
  const [facilities, setFacilities] = useState([]);
  const { loading, data } = useFetch("/guests/facility");

  useEffect(() => {
    setFacilities(data);
  }, [data]);

  if (loading) return <Loading />;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Searchbar setFacilities={setFacilities} facilitiesArr={data} />
      </Grid>
      <Grid item xs={12}>
        <FacilityList facilities={facilities} />
      </Grid>
    </Grid>
  );
}
