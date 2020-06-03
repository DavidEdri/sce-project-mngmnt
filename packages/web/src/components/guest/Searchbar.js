import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(2)}px 0`,
    alignItems: "center",
  },
}));

const neighborhoods = [
  "ה'",
  "ט'",
  "נווה זאב",
  "עיר עתיקה",
  "נאות לון",
  "נווה נוי",
  "ו' החדשה",
  "א",
  "ב'",
  "רמות",
  "ג'",
  'יי"א',
  "נחל עשן",
  "ד'",
  "שכ' ד'",
  "ו' הישנה",
  "שכ' ט'",
  "א'",
  "יא'",
  "רמבם",
  "ה' הישנה",
  'י"א',
  "נחל בקע",
  "שכונה ט'",
  "שכונה ג'",
  "יא",
];

export default function Searchbar({ setFacilities, facilitiesArr }) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  useEffect(() => {
    setFacilities(
      facilitiesArr.filter((x) => {
        const nameMatch = x.name.includes(name);
        const neighborhoodMatch =
          neighborhood !== "" ? x.neighborhood === neighborhood : true;

        return nameMatch && neighborhoodMatch;
      })
    );
  }, [facilitiesArr, name, neighborhood, setFacilities]);

  return (
    <Grid container className={classes.root}>
      <Grid item md={6} xs={12}>
        <TextField
          label="Facility name"
          fullWidth
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <FormControl component="fieldset" fullWidth margin="dense">
          <InputLabel>Neighborhood</InputLabel>
          <Select
            name={name}
            type="select"
            fullWidth
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            label="Neighborhood"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {neighborhoods.map((o) => (
              <MenuItem key={o} value={o}>
                {o}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

Searchbar.propTypes = {
  facilitiesArr: PropTypes.array.isRequired,
  setFacilities: PropTypes.func.isRequired,
};
