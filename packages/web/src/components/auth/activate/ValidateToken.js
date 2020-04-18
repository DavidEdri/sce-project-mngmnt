import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { logout as logoutUser } from "../../../redux/actions/authActions";
import text from "../../../utils/_text";

export default function ValidateToken({ match: { params } }) {
  const [content, setContent] = useState(<CircularProgress />);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { token } = params;

  if (user.active) {
    history.push("/dashboard");
  }

  useEffect(() => {
    const handleRedirect = () => {
      if ("id" in user) {
        dispatch(logoutUser());
      }
      history.push("/login");
    };

    const fetch = async () => {
      try {
        await Axios.post(`/guests/auth/activate/${token}`);
        setContent(
          <>
            <Typography
              variant="h5"
              color="primary"
              align="center"
              gutterBottom
            >
              {text.accActivated}
            </Typography>

            <Typography
              align="center"
              variant="subtitle1"
              paragraph
              gutterBottom
            >
              {text.redirectingToLogin}
            </Typography>

            <Box display="flex" alignItems="center" justifyContent="center">
              <Button color="primary" onClick={handleRedirect}>
                {text.clickHere}
              </Button>
              <Typography align="center" variant="subtitle1">
                {text.notRedirected}
              </Typography>
            </Box>
          </>
        );
        setTimeout(handleRedirect, 5000);
      } catch (error) {
        setContent(
          <Typography align="center" variant="subtitle1" color="error">
            {text.activateInvalid}
          </Typography>
        );
      }
    };

    fetch();
  }, [dispatch, history, token, user]);

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ minHeight: "400px" }}
    >
      <Grid item xs={12}>
        {content}
      </Grid>
    </Grid>
  );
}

ValidateToken.propTypes = {
  match: PropTypes.object.isRequired,
};
