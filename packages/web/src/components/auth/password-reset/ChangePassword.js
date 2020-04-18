import React, { useEffect, useState } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { validation } from "@project/common";
import { useSelector } from "react-redux";
import { Grid, Typography, Box } from "@material-ui/core";
import { isProduction } from "../../../utils/functions";
import MyFormik from "../../common/MyFormik/index";
import Loading from "../../common/Loading";
import text from "../../../utils/_text";

const fields = [
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

export default function ChangePassword({ match: { params } }) {
  // eslint-disable-next-line prefer-const
  let history = useHistory();
  const isLoggedin = useSelector(state => state.auth.isLoggedin);
  const [validToken, setValidToken] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const { token } = params;

  const onSubmit = async (data, actions, resetCaptcha) => {
    try {
      await Axios.post(`/guests/auth/passwordReset/${token}`, data);
      history.push("/login");
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

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await Axios.post("/guests/auth/validateResetToken", {
          token
        });
        setUserInfo({ name: res.data.name, email: res.data.email });
        setValidToken(true);
      } catch (error) {}
      setLoading(false);
    };

    fetch();
  }, [token]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <Grid item md={6} xs={12}>
        <Typography align="center" gutterBottom variant="h3">
          {text.changePassword}
        </Typography>
        {validToken && (
          <>
            <Typography align="center" gutterBottom variant="h5" paragraph>
              {text.rstPwdFor}
            </Typography>
            <Typography align="center" variant="subtitle2" paragraph>
              {userInfo.name}
            </Typography>
            <Typography align="center" variant="subtitle2" paragraph>
              {userInfo.email}
            </Typography>
          </>
        )}

        {validToken ? (
          <MyFormik
            fields={fields}
            onSubmit={onSubmit}
            validationSchema={validation.inputs.passwordConfirm}
            useCaptcha={isProduction()}
          />
        ) : (
          <Box display="flex" flexDirection="column">
            <Typography align="center" variant="h4">
              {text.error}
            </Typography>
            <Typography
              align="center"
              gutterBottom
              variant="subtitle1"
              color="error"
            >
              {text.activateInvalid}
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

ChangePassword.propTypes = {
  match: PropTypes.object.isRequired
};
