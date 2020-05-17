import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Axios from "axios";
import { Button, Box } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../../redux/actions/authActions";

const Favorite = ({ facilityID }) => {
  const dispatch = useDispatch();
  const { user, isLoggedin } = useSelector((state) => state.auth);

  const add = async () => {
    try {
      await Axios.put("/users/facility/favorite", { facilityID });
      dispatch(addToFavorite(facilityID));
    } catch (error) {}
  };

  const remove = async () => {
    try {
      await Axios.delete(`/users/facility/favorite/${facilityID}`);
      dispatch(removeFromFavorite(facilityID));
    } catch (error) {}
  };

  if (!isLoggedin) return <></>;

  return (
    <Box display="flex" justifyContent="center">
      {user.favorites.includes(facilityID) ? (
        <Button
          color="primary"
          startIcon={<FavoriteIcon color="error" />}
          onClick={remove}
        >
          Remove from favorites
        </Button>
      ) : (
        <Button
          color="primary"
          startIcon={<FavoriteIcon color="error" />}
          onClick={add}
        >
          add to favorites
        </Button>
      )}
    </Box>
  );
};

Favorite.propTypes = {
  facilityID: PropTypes.string.isRequired,
};

export default Favorite;
