import React from "react";
import { Link, useHistory } from "react-router-dom";
import { validation } from "@project/common";
import { useSelector } from "react-redux";
import { Button, Grid, Box } from "@material-ui/core";
import { isProduction } from "../../utils/functions";
import MyFormik from "../common/MyFormik/index";
import text from "../../utils/_text";

const fields = [
  {
    fieldName: "name",
    label: text.fullNameLabel,
    type: "text",
    options: "text",
    initialValue: ""
  },
  {
    fieldName: "email",
    label: text.emailLabel,
    type: "text",
    options: "email",
    initialValue: ""
  },
  {
    fieldName: "password",
    label: text.passLabel,
    type: "text",
    options: "password",
    initialValue: ""
  },
  {
    fieldName: "password2",
    label: text.passConfirmLabel,
    type: "text",
    options: "password",
    initialValue: ""
  }
];

export default function Register() {
  const history = useHistory();
  const isLoggedin = useSelector(state => state.auth.isLoggedin);

  const afterDefualtSubmit = () => {
    history.push("/login");
  };

  if (isLoggedin) {
    history.push("/dashboard");
  }

  return (
    <Grid container justify="center">
      <Grid item md={6} xs={12}>
        <MyFormik
          fields={fields}
          title={text.register}
          paragraph={text.registerParagraph}
          onSubmit="/guests/auth/register"
          afterDefualtSubmit={afterDefualtSubmit}
          validationSchema={validation.forms.register}
          useCaptcha={isProduction()}
        />
        <Box display="flex" justifyContent="center">
          <Button
            color="primary"
            component={Link}
            to="/login"
            style={{ margin: "0 auto" }}
          >
            {text.alreadyUser}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
