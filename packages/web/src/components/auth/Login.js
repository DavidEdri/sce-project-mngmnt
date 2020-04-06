import React, { useEffect } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { validation } from "@project/common";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Box } from "@material-ui/core";
import { isProduction } from "../../utils/functions";
import { loginUser } from "../../redux/actions/authActions";
import MyFormik from "../common/MyFormik/index";
import text from "../../utils/_text";

const fields = [
  {
    fieldName: "email",
    label: text.emailLabel,
    type: "text",
    options: "email",
    initialValue: "",
  },
  {
    fieldName: "password",
    label: text.passLabel,
    type: "text",
    options: "password",
    initialValue: "",
  },
];

export default function Login({ location: { state } }) {
  const lastPath = state ? state.lastPath : null;
  const history = useHistory();
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const { email, password } = data;

    const res = await Axios.post("/guests/auth/login", { email, password });
    const { token } = res.data;
    dispatch(loginUser(token));

    if (lastPath) history.push(lastPath);
    else history.push("/dashboard");
  };

  useEffect(() => {
    if (isLoggedin) {
      history.push("/dashboard");
    }
  }, [isLoggedin, history]);

  return (
    <Grid container justify="center">
      <Grid item md={6} xs={12}>
        <MyFormik
          fields={fields}
          title={text.login}
          paragraph={text.loginParagraph}
          onSubmit={onSubmit}
          validationSchema={validation.forms.login}
          useCaptcha={isProduction()}
        />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Button color="primary" component={Link} to="/register">
            {text.noAccount}
          </Button>
          <Button color="primary" component={Link} to="/forgotPassword">
            {text.forgotPass}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

Login.propTypes = {
  location: PropTypes.object,
};
