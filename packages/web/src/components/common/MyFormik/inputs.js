/* eslint-disable react/prop-types */
import React from "react";
import moment from "moment";
// import "moment/locale/he"; // uncomment if hebrew wanted
import MomentUtils from "@date-io/moment";
import { useField } from "formik";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControlLabel,
  Radio,
  Checkbox,
  FormControl,
  FormLabel,
  RadioGroup,
  FormHelperText,
  FormGroup,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  Box,
  Typography
} from "@material-ui/core";
import text from "../../../utils/_text";
import { isRTL } from "../../../utils/constants";

const useStyles = makeStyles(theme => ({
  label: {
    marginLeft: 0
  },
  marginDense: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5)
  }
}));

export const MyTextField = ({ ...props }) => {
  const [field, meta] = useField(props);
  const errorMsg = meta.error && meta.touched ? meta.error : "";
  const isError = errorMsg !== "";

  return (
    <TextField
      {...field}
      {...props}
      helperText={errorMsg}
      error={isError}
      margin="dense"
    />
  );
};

export const MyRadio = ({ label, ...props }) => {
  const [field] = useField(props);

  return (
    <FormControlLabel
      {...field}
      label={label}
      control={<Radio />}
      labelPlacement="start"
    />
  );
};

export const MyCheckbox = ({ label, ...props }) => {
  const [field] = useField(props);

  return (
    <FormControlLabel
      {...field}
      label={label}
      control={<Checkbox />}
      labelPlacement="start"
    />
  );
};

export const MyRadioGroup = ({ name, options, label }) => {
  const [, meta] = useField({ name });
  const errorMsg = meta.error && meta.touched ? meta.error : "";
  const isError = errorMsg !== "";

  return (
    <FormControl fullWidth margin="normal">
      <FormLabel error={isError}>{label}</FormLabel>
      <RadioGroup row>
        {options.map(o => (
          <MyRadio
            key={o.label}
            type="radio"
            name={name}
            value={o.value}
            label={o.label}
          />
        ))}
      </RadioGroup>
      {isError && (
        <FormHelperText error variant="standard" style={{ fontSize: "16px" }}>
          {errorMsg}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export const MyCheckboxGroup = ({ name, options, label }) => {
  const [, meta] = useField({ name });
  const errorMsg = meta.error && meta.touched ? meta.error : "";
  const isError = errorMsg !== "";

  return (
    <FormControl component="fieldset" fullWidth margin="normal">
      <FormLabel error={isError}>{label}</FormLabel>
      <FormGroup row>
        {options.map(o => (
          <MyCheckbox
            key={o.label}
            type="checkbox"
            name={name}
            value={o.value}
            label={o.label}
          />
        ))}
      </FormGroup>
      {isError && (
        <FormHelperText error variant="standard" style={{ fontSize: "16px" }}>
          {errorMsg}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export const MySelect = ({ name, options, isMulti, label }) => {
  const [field, meta] = useField({ name });
  const errorMsg = meta.error && meta.touched ? meta.error : "";
  const isError = errorMsg !== "";

  return (
    <FormControl component="fieldset" fullWidth margin="dense">
      <InputLabel error={isError}>{label}</InputLabel>
      <Select name={name} type="select" multiple={isMulti} fullWidth {...field}>
        <MenuItem value="">
          <em>{text.selectEmpty}</em>
        </MenuItem>
        {options.map(o => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
      {isError && (
        <FormHelperText
          error
          variant="standard"
          style={{ fontSize: "16px", marginBottom: "10px" }}
        >
          {errorMsg}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export const MySwitch = ({ name, label }) => {
  const [field] = useField({ name });
  const classes = useStyles();

  return (
    <Box className={classes.marginDense}>
      <FormControlLabel
        className={classes.label}
        control={<Switch checked={field.value} {...field} color="primary" />}
        label={label}
        labelPlacement="start"
      />
    </Box>
  );
};

export const MyTextarea = ({ ...props }) => {
  const [field, meta] = useField(props);
  const errorMsg = meta.error && meta.touched ? meta.error : "";
  const isError = errorMsg !== "";

  return (
    <TextField
      {...props}
      {...field}
      multiline
      helperText={errorMsg}
      error={isError}
    />
  );
};

export const OtherInput = ({ component: Component, name, setValue, other }) => {
  const [field, meta] = useField({ name });
  const errorMsg = meta.error;

  return (
    <Component {...field} {...other} errorMsg={errorMsg} setValue={setValue} />
  );
};

export const DateSelect = ({ name, label, setValue, type }) => {
  const [field, meta] = useField({ name });
  const classes = useStyles();
  const errorMsg = meta.error && meta.touched ? meta.error : "";
  const isError = errorMsg !== "";

  if (isRTL) {
    moment.locale("he");
  }

  const typeToComponent = () => {
    switch (type) {
      case "date":
        return (
          <DatePicker
            value={field.value}
            onChange={date => setValue(date.format())}
          />
        );
      case "time":
        return (
          <TimePicker
            value={field.value}
            onChange={date => setValue(date.format())}
          />
        );
      case "datetime":
        return (
          <DateTimePicker
            value={field.value}
            onChange={date => setValue(date.format())}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box className={classes.marginDense}>
      <Box display="flex" alignItems="center">
        <Typography
          color={isError ? "error" : undefined}
          style={{ marginRight: 10 }}
        >
          {`${label}:`}
        </Typography>

        <MuiPickersUtilsProvider
          libInstance={moment}
          utils={MomentUtils}
          locale={isRTL ? "he" : undefined}
        >
          {typeToComponent()}
        </MuiPickersUtilsProvider>
      </Box>
      <Typography color="error">{errorMsg}</Typography>
    </Box>
  );
};
