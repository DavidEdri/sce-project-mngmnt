import React from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { validation } from "@project/common";
import { useSelector } from "react-redux";
import { Grid, Typography, Box } from "@material-ui/core";
import { isProduction } from "../../../utils/functions";
import MyFormik from "../../common/MyFormik/index";
import text from "../../../utils/_text";

const fields = [
  {
    fieldName: "email",
    label: text.emailLabel,
    type: "text",
    options: "email",
    initialValue: ""
  }
];

export default function SendPwdToken() {
  // eslint-disable-next-line prefer-const
  let history = useHistory();
  const isLoggedin = useSelector(state => state.auth.isLoggedin);
  const [sent, setSent] = React.useState(false);

  const onSubmit = async (data, actions, resetCaptcha) => {
    try {
      await Axios.post("/guests/auth/passwordReset", data);
      setSent(true);
    } catch (error) {
      if (isProduction()) {
        resetCaptcha(error);
      }
      actions.setErrors(error.response.data);
    }
  };

  if (isLoggedin) {
    history.push("/dashboard");
  }

  return (
    <Grid container justify="center">
      {!sent ? (
        <Grid item md={6} xs={12}>
          <MyFormik
            fields={fields}
            title="Password Reset"
            paragraph="Enter your email"
            onSubmit={onSubmit}
            validationSchema={validation.inputs.email}
            useCaptcha={isProduction()}
          />
        </Grid>
      ) : (
        <Box display="flex" flexDirection="column">
          <Typography align="center" variant="h4">
            {text.success}
          </Typography>
          <Typography align="center" gutterBottom variant="subtitle1">
            {text.followMail}
          </Typography>
        </Box>
      )}
    </Grid>
  );
}
